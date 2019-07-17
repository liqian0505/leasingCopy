import request from '../utils/request';
import router from 'umi/router'

export default {
  namespace: 'contractList',
  state: [],
  reducers: {
    updateContractList(_, { newList }) {
      return newList
    },
    deleteContractInList(state, { targetID }) {
      return state.filter(contract => contract.id !== targetID)
    },
    createContractInList(state, { newID }) {
      return state.concat({
        id: newID,
        name: "未定名合同",
        schema: {
          type: 'object',
          title: 'empty object',
          properties: {},
          formData: null,
          editorState: null
        }
      })
    }
  },
  effects: {
    *getContractList({ templateID }, { call, put }) {
      const response = yield call(request, '/api/contracts', { id: templateID });

      yield put({ type: 'updateContractList', newList: response })

      router.push("/ContractList")
    },
    *deleteContract({ targetID }, { call, put }) {
      const response = yield call(request.delete, `/api/contracts/${targetID}`)

      yield put({ type: 'deleteContractInList', targetID: targetID })
    },
    *createContract(_, { call, put }) {
      const { id } = yield call(request.post, "/api/contracts")
      console.log(id)
      yield put({ type: 'createContractInList', newID: id })
    }
  },
};
