import request from '../utils/request';
import router from 'umi/router'

export default {
  namespace: 'contractList',
  state: [],
  reducers: {
    updateContractList(_, { newList }) { return newList }
  },
  effects: {
    *getContractList({ templateID, jump }, { call, put }) {
      const response = templateID === undefined ? yield call(request, '/api/contracts') : yield call(request, `/api/contracts?id=${templateID}`)
      yield put({
        type: 'updateContractList',
        newList: response.map(contract => {
          contract.content = { ...contract.content }
          contract.content['id'] = contract.id
          return contract.content
        })
      })

      if (jump !== undefined) router.push(`/ContractList?id=${templateID}`)
    },
    *deleteContract({ targetID, templateID }, { call, put }) {
      const response = yield call(request.delete, `/api/contracts/${targetID}?templateId=${templateID}`)
      yield put({
        type: 'updateContractList', newList: response.map(contract => {
          contract.content = { ...contract.content }
          contract.content['id'] = contract.id
          return contract.content
        })
      })
    },
    *createContract({ templateID }, { call, put }) {

      const defaultContent = {
        name: '未命名合同',
        formData: {},
        templateID: templateID
      }

      const response = yield call(request.post, `/api/contracts?templateId=${templateID}`, { data: defaultContent })

      yield put({
        type: 'updateContractList',
        newList: response.map(contract => {
          contract.content = { ...contract.content }
          contract.content['id'] = contract.id
          return contract.content
        })
      })
    }
  },
};
