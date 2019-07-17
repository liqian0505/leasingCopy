import router from 'umi/router'

import BraftEditor from 'braft-editor';
import request from '../utils/request';

export default {
  namespace: 'template',
  state: {
    editorContent: null,
    editorState: null,
    schema: null,
    id: null,
  },
  reducers: {
    updateEditorState(state, { newState }) {
      return newState
    },
  },
  effects: {
    *getTemplate({ targetID }, { call, put }) {
      const { editorContent, schemaContent, id } = yield call(request.get, `/api/templates/${targetID}`)
      yield put({
        type: 'updateEditorState',
        newState: {
          editorContent,
          schemaContent,
          id,
          editorState: BraftEditor.createEditorState(editorContent),
        },
      })
      router.push(`/TemplateEditor?id=${targetID}`)
    },
    *updateTemplate({ targetID, jsonContent }, { call }) {
      console.log(targetID, jsonContent)
    },
    *createTemplate(_, { call, put }) {
      const response = yield call(request.post, '/api/templates');
      yield put({
        type: 'updateTemplate',
        newState: { ...response.id },
      });
      yield put({
        type: 'templateList/getTemplateList',
      });
    },
  },
};
