import request from '../utils/request';

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
    },
  },
};
