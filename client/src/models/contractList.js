import request from '../utils/request';
import router from 'umi/router'

export default {
  namespace: 'contractList',
  state: [],
  reducers: {
    updateContractList(state, { newList }) {
      return newList
    },
    deleteContract(state, { targetID }) {
      return state.filter(contract => contract !== targetID)
    }
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
    *deleteContact({ templateID }, { call, put }) {
      const response = yield call(request.delete, '/api/contract', { params: { id: templateID } })

      if (response.status === "OK") {
        yield put({
          type: 'deleteContract',
          targetID: templateID
        })
      }
    }
  },
};
