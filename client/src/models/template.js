import router from 'umi/router'

import BraftEditor from 'braft-editor';
import request from '../utils/request';

export default {
  namespace: 'template',
  state: {
    editorContent: null,
    editorState: null,
    schema: {
      type: 'object',
      title: 'empty object',
      properties: {},
    },
    id: null,
  },
  reducers: {
    updateEditorState(state, { newState }) {
      return newState
    },
  },
  effects: {
    *getTemplate({ targetID }, { call, put }) {
      const { editorContent, schemaContent, id } = yield call(request.get, '/api/template', { params: { id: targetID } })

      yield put({
        type: 'updateEditorState',
        newState: {
          editorContent,
          schemaContent,
          id,
          editorState: BraftEditor.createEditorState(editorContent),
        },
      })
      router.push(`/TemplateContent?id=${  id}`)
    },
    *updateTemplate({ targetID, jsonContent }, { call }) {
      console.log(targetID, jsonContent)
    },
    *createTemplate(_, { call, put }) {
      const { id } = yield call(request.post, '/api/templates', { params: { newTemplate: null } });
      console.log(id)
      yield put({
        type: 'updateTemplate',
        newState: { ...id },
      });
    },
  },
};
