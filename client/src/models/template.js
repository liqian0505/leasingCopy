import request from '../utils/request';
import router from 'umi/router'

export default {
  namespace: 'template',
  state: {
    editorState: null,
    schema: null,
    id: null
  },
  reducers: {
    updateEditorState(state, { newState }) {
      return newState
    },
  },
  effects: {
    *getTemplate({ targetID }, { call, put }) {
      const { editorState, schema, id } = yield call(request, "/template", { params: { id: targetID } })
      
      yield put({
        type: "updateEditorState",
        newState: {
          editorState,
          schema,
          id
        }
      })
      router.push("/TemplateContent?id=" + id)
    },
    *updateTemplate({ targetID, jsonContent }, { call }) {
      console.log(targetID, jsonContent)
    }
  },
};
