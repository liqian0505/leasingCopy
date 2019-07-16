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
    *getTemplate({ id }, { call, put }) {

      const response = yield call(request, "/template", { params: { id: id } })

      yield put({
        type: "updateEditorState",
        newState:{
          editorState: response
        }
      })
      // const response = yield call(request, );

      // yield put({
      //   type: 'updateEditorState',
      //   newState: null
      // });
    },
  },
};
