import request from '../utils/request';

export default {
  namespace: 'contractList',
  state: null,
  reducers: {
    updateContractList(state, { newList }) {
      return newList;
    },
  },
  effects: {
    *getContractList(_, { call, put }) {
      const response = yield call(request, '/contract/all');

      yield put({
        type: 'updateContractList',
        newList: response,
      });
    },
  },
};
