import request from '../utils/request'
import router from 'umi/router'
import BraftEditor from 'braft-editor'
import jp from 'jsonpath'

export default {
  namespace: 'contract',
  state: {
    id: null,
    schema: {
      type: 'object',
      title: '',
      properties: {},
    },
    templateID: null,
    formData: {},
    editorState: null,
    editorContent: {},
    commitVersionList: [],
    currentCommitID: null
  },
  reducers: {
    setContractState(state, { newState }) {
      var nextState = {
        ...state,
        ...newState
      }

      var { editorContent, formData } = nextState
      const data = formData

      var copyContent = JSON.parse(JSON.stringify(editorContent))
      jp.apply(copyContent, '$..text', value => {
        const result = eval('`' + value + '`')
        return result.replace("undefined", "「----」")
      })

      return {
        ...nextState,
        editorState: BraftEditor.createEditorState(copyContent)
      }
    }
  },
  effects: {
    *getContract({ targetID, jump }, { call, put }) {
      const response = yield call(request, `/api/contracts/${targetID}`)            //获取目标合同id及content
      const { id, content } = response[0]
      const commitVersionList = yield call(request, `/api/contracts/${id}/commits`) //获取目标合同全部历史修改记录

      yield put({
        type: "setContractState",
        newState: {
          ...content,
          id,
          commitVersionList,
          currentCommitID: commitVersionList[commitVersionList.length - 1].commitId
        }
      })

      if (jump !== undefined) router.push("/ContractEditor?id=" + id)
    },

    *updateContract({ targetID, content }, { call, put }) {
      const contractRequest = {
        id: targetID,
        content: content
      }
      const response = yield call(request.put, `/api/contracts/${targetID}`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contractRequest)
      })
      const commitVersionList = yield call(request, `/api/contracts/${targetID}/commits`)

      yield put({
        type: "setContractState",
        newState: {
          ...response.content,
          commitVersionList,
          currentCommitID: commitVersionList[commitVersionList.length - 1].commitId
        }
      })
    },

    *rollbackContract({ targetID, commitID }, { call, put }) {
      const response = yield call(request, `/api/contracts/${targetID}/commits?commitId=${commitID}`)
      const commitVersionList = yield call(request, `/api/contracts/${targetID}/commits`)
      const { content } = response[0]

      yield put({
        type: "setContractState",
        newState: {
          ...content,
          commitVersionList,
          currentCommitID: commitID
        }
      })
    }
  },
};
