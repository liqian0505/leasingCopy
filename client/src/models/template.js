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
      router.push(`/TemplateEditor/${targetID}`)
    },
    *updateTemplate({ targetID, jsonContent }, { call }) {
      const response = yield call(request.put, `/api/templates/${targetID}`, { body: jsonContent })
    },
    *createTemplate({ name, defaultContent }, { call, put }) {
      const response = yield call(request.post, '/api/templates', { body: name, defaultContent });
      yield put({
        type: 'templateList/updateTemplateList',
        newList: response,
      });
    },
  },
};
