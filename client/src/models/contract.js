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
    editorContent: null
  },
  reducers: {
    setContractState(state, { newState }) {
      const next = {
        ...state,
        ...newState
      }
      console.log(next)
      debugger
      return next
    }
  },
  effects: {
    *getContract({ targetID, jump }, { call, put }) {

      const { id, content } = yield call(request, `/api/contracts/${targetID}`)
      const { name, formData, templateID } = content
      const template = yield call(request, `/api/templates/${templateID}`)
      const { editorContent, schema } = template.content

      yield put({
        type: "setContractState",
        newState: {
          id,
          name,
          formData,
          schema,
          templateID,
          editorContent,
          editorState: BraftEditor.createEditorState(editorContent)
        }
      })

      if (jump !== undefined) router.push("/ContractEditor?id=" + id)
    },

    *updateContract({ targetID, content, newEditorState }, { call, put }) {
      // debugger
      const response = yield call(request.put, `/api/contracts/${targetID}`, { data: content })
      // debugger
      yield put({
        type: "setContractState",
        newState: {
          ...response.content,
          editorState: newEditorState
        }
      })
    }
  },
};
