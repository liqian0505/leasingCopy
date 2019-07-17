import request from '../utils/request';
import router from 'umi/router'

import BraftEditor from 'braft-editor';

export default {
  namespace: 'template',
  state: {
    editorContent: null,
    editorState: null,
    schema: null,
    id: null
  },
  reducers: {
    updateEditorState(state, { newState }) {
      return newState
    },
  },
  effects: {
    *getTemplate({ targetID }, { call, put }) {
      const { editorContent, schemaContent, id } = yield call(request, "/template", { params: { id: targetID } })

      yield put({
        type: "updateEditorState",
        newState: {
          editorContent,
          schemaContent,
          id,
          editorState: BraftEditor.createEditorState(editorContent)
        }
      })
      router.push("/TemplateContent?id=" + id)
    },
    *updateTemplate({ targetID, jsonContent }, { call }) {
      console.log(targetID, jsonContent)
    }
  },
};
