import request from '../utils/request';

export default {
  namespace: 'contractEditorState',
  state: {},
  reducers: {
    updateTemplateList(state, { newList, extra }) {
      console.log(state);
      return {
        ...state,
      };
    },
  },
  effects: {
    *getTemplateList(_, { call, put }) {
      const response = yield call(request, 'a url');

      yield put({
        type: 'updateTemplateList',
        newList: [],
        extra: null,
      });
    },
  },
};
