import request from '../utils/request';
import router from 'umi/router'

export default {
  namespace: 'contract',
  state: {
    formData: null,
    id: null
  },
  reducers: {
    updateEditorState(state, { newState }) {
      console.log(newState)

      return newState
    },
  },
  effects: {
    *getContract({ targetID }, { call, put }) {
      const { formData, id } = yield call(request, "/contract", { params: { id: targetID } })
      yield put({
        type: "updateEditorState",
        newState: {
          formData,
          id
        }
      })
      router.push("/ContractContent")
    },
  },
};
