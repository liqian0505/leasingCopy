import request from '../utils/request';

export default {
  namespace: 'templateList',
  state: [],
  reducers: {
    updateTemplateList(state, { newList }) {
      return newList;
    },
  },
  effects: {
    *getTemplateList(_, { call, put }) {
      const response = yield call(request, '/api/templates');
      yield put({
        type: 'updateTemplateList',
        newList: response,
      });
    },
    *deleteTemplate({ targetID }, { call, put }) {
      const response = yield call(request.delete, `/api/templates/${targetID}`)
      if (response === `delete ${targetID} succeed`) {
        yield put({
          type: 'getTemplateList',
        });
      }
    },
  },
};
