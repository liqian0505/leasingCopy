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
      console.log(response)

      yield put({ type: 'updateContractList', newList: response })
      templateID === undefined ? router.push("/ContractList") : router.push(`/ContractList/${templateID}`)
    },
    *deleteContract({ targetID, templateID }, { call, put }) {
      const response = yield call(request.delete, `/api/contracts/${targetID}`, { data: { templateId: templateID } })
      yield put({ type: 'updateContractList', newList: response })
      templateID === undefined ? router.push("/ContractList.html") : router.push(`/ContractList.html/${templateID}`)
    },
    *createContract({ templateID }, { call, put }) {
      const defaultTemplateID = "5d2ff2bf93935608788b5161"

      const defaultContent = {
        name: '未命名合同',
        formData: {},
        schema: {
          type: 'object',
          title: 'empty object',
          properties: {},
        },
        templateID: defaultTemplateID
      }

      const response = yield call(request.post, '/api/contracts', { data: { templateId: defaultTemplateID, content: defaultContent } })
      console.log(response)

      yield put({ type: 'updateContractList', newList: response })
      templateID === undefined ? router.push("/ContractList") : router.push(`/ContractList/${templateID}`)
    }
  },
};
