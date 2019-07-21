import request from '../utils/request';

export default {
  namespace: 'templateList',
  state: [],
  reducers: {
    updateTemplateList(_, { newList }) {
      return newList;
    },
  },
  effects: {
    *getTemplateList(_, { call, put }) {
      const response = yield call(request, '/api/templates');

      console.log(response)

      const proList = response.map(item => ({
        id: item.id,
        // name: item.content.name,
        // editorContent: item.content.editorContent,
        // schema: item.content.schema,
      }))
      proList.push({ id: 'default' });
      proList.reverse();
      yield put({
        type: 'updateTemplateList',
        newList: proList,
      });
    },
    *deleteTemplate({ targetID }, { call, put }) {
      const response = yield call(request.delete, `/api/templates/${targetID}`);
      const proList = response.map(item => ({
        id: item.id,
        name: item.content.name,
        editorContent: item.content.editorContent,
        schema: item.content.schema,
      }))
      proList.push({ id: 'default' });
      proList.reverse();
      yield put({
        type: 'updateTemplateList',
        newList: proList,
      });
    },
  },
};
