import request from '../utils/request';
import router from 'umi/router'

export default {
  namespace: 'contractList',
  state: [],
  reducers: {
    updateContractList(_, { newList }) { return newList }
  },
  effects: {
    *getContractList({ templateID }, { call, put }) {
      const response = templateID === undefined ? yield call(request, "/api/contracts") : yield call(request, `/api/contracts/${templateID}`);
      yield put({ type: 'updateContractList', newList: response })
      templateID === undefined ? router.push("/ContractList") : router.push(`/ContractList/${templateID}`)
    },
    *deleteContract({ targetID, templateID }, { call, put }) {
      const response = yield call(request.delete, `/api/contracts/${targetID}`)
      yield put({ type: 'updateContractList', newList: response })
      templateID === undefined ? router.push("/ContractList") : router.push(`/ContractList/${templateID}`)
    },
    *createContract({ templateID }, { call, put }) {
      const content = {
        name: '未命名合同',
        formData: {

        },
        schema: {
          type: 'object',
          title: 'empty object',
          properties: {},
        },
        templateID: "1"
      }

      const { id } = yield call(request.post, `/api/contracts/${templateID}`, { data: { content } })
      yield put({ type: 'updateContractList', newList: response })
      router.push("/ContractList")
    }
  },
};
