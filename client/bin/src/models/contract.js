import request from '../utils/request';

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
    },
  },
};
