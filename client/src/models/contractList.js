import request from '../utils/request';

export default {
  namespace: 'contractList',
  state: [],
  reducers: {
    updateContractList(state, { newList, extra }) {
      return {
        ...state,
      };
    },
  },
  effects: {
    *getContractList(_, { call, put }) {
      const response = yield call(request, 'a url');

      yield put({
        type: 'updateContractList',
        newList: [],
        extra: null,
      });
    },
  },
};
