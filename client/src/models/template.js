import router from 'umi/router'
import BraftEditor from 'braft-editor';
import request from '../utils/request';

export default {
  namespace: 'template',
  state: {
    editorContent: null, // BraftEditor的初始值
    editorState: null, // BraftEditor的快照
    schema: {
      type: 'object',
      title: 'empty object',
      properties: {},
    }, // SchemaEditor的JSON
    id: null, // TemplateID
    name: '未命名模板', // 模板名称
  },
  reducers: {
    updateState(state, { payload }) {
      return payload;
    },
    updateEditorState(state, { payload }) {
      return {
        ...state,
        editorState: payload,
      }
    },
    updateSchema(state, { payload }) {
      return {
        ...state,
        schema: payload,
      }
    },
  },
  effects: {
    *getTemplate({ targetID }, { call, put }) {
      // const { name, editorContent, schema, id } = yield call(request.get, `/api/templates/${targetID}`)
      const { id, content } = yield call(request.get, `/api/templates/${targetID}`)
      const { name, editorContent, schema } = content
      console.log(id, name, editorContent, schema)
      yield put({
        type: 'updateState',
        payload: {
          name,
          editorContent,
          schema,
          id,
          editorState: BraftEditor.createEditorState(editorContent),
        },
      })
      router.push(`/TemplateEditor?id=${targetID}`)
    },
    *updateTemplate({ targetID, content }, { call }) {
      const response = yield call(request.put, `/api/templates/${targetID}`, { data: content })
    },
    *createTemplate({ defaultContent }, { call, put }) {
      const response = yield call(request.post, '/api/templates/new', { data: defaultContent });
      const proList = response.map(item => ({
        id: item.id,
        name: item.content.name,
        editorContent: item.content.editorContent,
        schema: item.content.schema,
      }))
      yield put({
        type: 'templateList/updateTemplateList',
        newList: proList,
      });
    },
  },
};
