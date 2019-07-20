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
    *deleteContract({ targetID }, { call, put }) {
      const response = yield call(request.delete, `/api/contracts/${targetID}`)
      yield put({
        type: 'updateContractList', newList: response.map(contract => {
          contract.content = { ...contract.content }
          contract.content['id'] = contract.id
          return contract.content
        })
      })
    },
    *createContract({ templateID, commitID }, { call, put }) {

      const commitList = yield call(request, `/api/templates/${templateID}/commits?commitId=${commitID}`)

      const { id, content } = commitList[0]

      const defaultContent = {
        ...content,
        name: '未命名合同',
        formData: {},
        templateID: templateID,
        templateCommitID: commitID
      }

      const response = yield call(request.post, `/api/contracts`, { data: defaultContent })

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
