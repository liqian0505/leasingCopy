import request from '../utils/request'
import router from 'umi/router'
import BraftEditor from 'braft-editor'

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
    editorContent: null
  },
  reducers: {
    setContractState(state, { newState }) {
      return {
        ...state,
        ...newState
      }
    }
  },
  effects: {
    *getContract({ targetID, jump }, { call, put }) {

      const { id, content } = yield call(request, `/api/contracts/${targetID}`)     //获取目标合同id及content
      const template = yield call(request, `/api/templates/${content.templateID}`)  //获取目标模板
      const { editorContent, schema } = template.content                            //获取模板editorContent及schema
      const editorState = BraftEditor.createEditorState(editorContent)              //创建新editorState

      yield put({
        type: "setContractState",
        newState: {
          id,
          schema,
          editorState,
          editorContent,
          ...content
        }
      })

      if (jump !== undefined) router.push("/ContractEditor?id=" + id)
    },

    *updateContract({ targetID, content, newEditorState }, { call, put }) {
      const response = yield call(request.put, `/api/contracts/${targetID}`, { data: content })

      if (newEditorState !== undefined) {
        yield put({
          type: "setContractState",
          newState: {
            ...response.content,
            editorState: newEditorState
          }
        })
      }
      else {
        yield put({
          type: "setContractState",
          newState: response.content
        })
      }
    }
  },
};
