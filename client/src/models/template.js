import request from '../utils/request';

export default {
  namespace: 'template',
  state: {},
  reducers: {
    updateEditorState(state, { newList, extra }) {
      return {
        ...state,
      };
    },
  },
  effects: {
    *getTemplate(_, { call, put }) {
      const response = yield call(request, 'a url');

      yield put({
        type: 'updateTemplateList',
        newList: [],
        extra: null,
      });
    },
  },
};
