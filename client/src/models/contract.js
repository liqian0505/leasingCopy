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
    formData: null,
    editorState: null,
    editorContent: null,
    commitVersionList: []
  },
  reducers: {
    setContractState(state, { newState }) {

      var editorContent = newState.editorContent !== undefined ? newState.editorContent : state.editorContent
      const data = newState.formData !== undefined ? newState.formData : state.formData

      editorContent = { ...editorContent }

      var copyContent = JSON.parse(JSON.stringify(editorContent))
      jp.apply(copyContent, '$..text', value => {
        const result = eval('`' + value + '`')
        return result.replace("undefined", "「----」")
      })

      return {
        ...state,
        ...newState,
        editorState: BraftEditor.createEditorState(copyContent)
      }
    }
  },
  effects: {
    *getContract({ targetID, jump }, { call, put }) {

      const { id, content } = yield call(request, `/api/contracts/${targetID}`)     //获取目标合同id及content
      const commitVersionList = yield call(request, `/api/contracts/${id}/commits`) //获取目标合同全部历史修改记录
      const { editorContent, schema } = content                                     //获取模板editorContent及schema

      yield put({
        type: "setContractState",
        newState: {
          id,
          schema,
          editorContent,
          commitVersionList,
          ...content
        }
      })

      if (jump !== undefined) router.push("/ContractEditor?id=" + id)
    },

    *updateContract({ targetID, content }, { call, put }) {
      const response = yield call(request.put, `/api/contracts/${targetID}`, { data: content })
      yield put({
        type: "setContractState",
        newState: response.content
      })
    }
  },
};
