import router from 'umi/router'
import BraftEditor from 'braft-editor';
import request from '../utils/request';
import { stat } from 'fs';

export default {
  namespace: 'template',
  state: {
    editorContent: null,      // BraftEditor的初始值
    editorState: null,        // BraftEditor的快照
    schema: {
      type: 'object',
      title: 'empty object',
      properties: {},
    },                        // SchemaEditor的JSON
    id: null,                 // TemplateID
    name: '未命名模板',       // 模板名称
    commitList: [],
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        editorContent: payload.editorContent,
        editorState: payload.editorState,
        schema: payload.schema,
        id: payload.id,
        name: payload.name,
      }
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
    updateCommitList(state, { payload }) {
      return {
        ...state,
        commitList: payload,
      }
    },
  },
  effects: {
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
    *getTemplate({ targetID, jump }, { call, put }) {
      const { id, content } = yield call(request.get, `/api/templates/${targetID}`)
      const { name, editorContent, schema } = content
      // console.log(id, name, editorContent, schema)
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
      if (jump !== undefined) router.push(`/TemplateEditor?id=${targetID}`)
    },
    *updateTemplate({ targetID, content }, { call }) {
      const response = yield call(request.put, `/api/templates/${targetID}`, { data: content })
    },
    *getCommitList({ targetID }, { call, put }) {
      const response = yield call(request, `/api/templates/${targetID}/commits`)
      // console.log(response)
      yield put({
        type: 'updateCommitList',
        payload: response,
      })
    },
    *getCommit({ targetID, commitID }, { call, put }) {
      const response = yield call(request, `/api/templates/${targetID}/commits?commitId=${commitID}`);
      const { id, content } = response[0];
      const { name, editorContent, schema } = content;
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
    },
  },
};
