import request from '../utils/request'
import router from 'umi/router'
import { message } from 'antd'

export default {
  namespace: 'contractList',
  state: [],
  reducers: {
    updateContractList(_, { newList }) { return newList }
  },
  effects: {
    *getContractList({ templateID, jump }, { call, put }) {
      const response = yield call(request, '/api/contracts')
      yield put({
        type: 'updateContractList',
        newList: response.map(contract => {
          contract.content['id'] = contract.id
          return contract.content
        })
      })
      message.success("成功获取合同列表", 0.5)
      if (jump !== undefined) router.push(`/ContractList?id=${templateID}`)
    },

    *deleteContract({ targetID }, { call, put }) {
      const response = yield call(request.delete, `/api/contracts/${targetID}`)
      yield put({
        type: 'updateContractList', newList: response.map(contract => {
          contract.content = { ...contract.content }
          contract.content['id'] = contract.id
          return contract.content
        })
      })
      message.success("删除成功", 0.5)
    },

    *createContract({ templateID, commitID }, { call, put }) {
      const { id, content } = yield call(request, `/api/templates/${templateID}`)
      const contractRequest = {
        id: null,
        content: {
          ...content,
          name: content.name+"-合同",
          formData: {},
          templateID: templateID,
          templateCommitID: commitID
        }
      }

      const response = yield call(request.post, `/api/contracts/new`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contractRequest)
      })

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
