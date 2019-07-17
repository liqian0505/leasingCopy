import request from '../utils/request'
import router from 'umi/router'
import BraftEditor from 'braft-editor'

export default {
  namespace: 'contract',
  state: {
    id: null,
    schema: {
      type: 'object',
      title: 'empty object',
      properties: {},
    },
    formData: null,
    editorState: null
  },
  reducers: {
    setContractState(_, { newState }) { return newState }
  },
  effects: {
    *getContract({ targetID }, { call, put }) {
      const { id, formData, schema, templateID } = yield call(request, "/contract", { params: { id: targetID } })
      const { editorContent } = yield call(request, "/template", { params: { id: templateID } })

      yield put({
        type: "setContractState",
        newState: {
          id,
          formData,
          schema,
          editorState: BraftEditor.createEditorState(editorContent)
        }
      })

      router.push("/ContractEditor?id=" + id)
    },
  },
};
