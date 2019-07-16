import request from '../utils/request';

export default {
  namespace: 'templateList',
  state: ['good'],
  reducers: {
    updateTemplateList(state, { newList, extra }) {},
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
