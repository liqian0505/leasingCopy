import request from '../utils/request';

export default {
  namespace: 'templateList',
  state: null,
  reducers: {
    updateTemplateList(state, { newList }) {
      return newList;
    },
  },
  effects: {
    *getTemplateList(_, { call, put }) {
      const response = yield call(request, '/template/all');

      yield put({
        type: 'updateTemplateList',
        newList: response,
      });
    },
  },
};
