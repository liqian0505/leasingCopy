import request from '../utils/request';
import router from 'umi/router'

export default {
  namespace: 'contractList',
  state: null,
  reducers: {
    updateContractList(state, { newList }) {
      return newList;
    },
  },
  effects: {
    *getContractList({ templateID }, { call, put }) {
      const response = yield call(request, '/contract/all', { params: { id: templateID } });

      yield put({
        type: 'updateContractList',
        newList: response,
      })

      router.push("/ContractList")
    },
  },
};
