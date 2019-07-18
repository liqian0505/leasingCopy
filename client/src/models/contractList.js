import request from '../utils/request';
import router from 'umi/router'

export default {
  namespace: 'contractList',
  state: [],
  reducers: {
    updateContractList(_, { newList }) {
      return newList
    }
  },
  effects: {
    *getContractList({ templateID }, { call, put }) {
      const response = templateID === undefined ? yield call(request, '/api/contracts') : yield call(request, `/api/contracts?id=${templateID}`)
      console.log("get reponse: ", response)
      yield put({ type: 'updateContractList', newList: response.map(contract => { return { name: contract.content.name, id: contract.id, templateID: contract.content.templateID } }) })
    },
    *deleteContract({ targetID, templateID }, { call, put }) {
      console.log("delete: ", targetID, templateID)
      const response = yield call(request.delete, `/api/contracts/${targetID}?templateId=${templateID}`)

      console.log(response)
      yield put({ type: 'updateContractList', newList: response })
    },
    *createContract({ templateID }, { call, put }) {
      if (templateID !== undefined) {

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

        const response = yield call(request.post, `/api/contracts?templateId=${defaultTemplateID}`, { data: defaultContent })

        yield put({ type: 'updateContractList', newList: response.map(contract => { return { name: contract.content.name, id: contract.id, templateID: contract.content.templateID } }) })
      }
      else
        router.push("/TemplateList")
    }
  },
};
