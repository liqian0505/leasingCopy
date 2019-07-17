import request from '../utils/request';

export default {
  namespace: 'templateList',
  state: [],
  reducers: {
    updateTemplateList(state, { newList }) {
      return newList;
    },
    deleteTemplate(state, { id }) {
      return state.filter(template => template !== id)
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
      const response = yield call(request.delete, '/api/templates/', { params: { id: targetID } })
      console.log(response)
      if (response === 'OK') {
        yield put({
          type: 'deleteTemplate',
          id: targetID,
        })
      }
    },
  },
};
