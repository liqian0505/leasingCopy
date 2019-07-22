import router from 'umi/router';
import BraftEditor from 'braft-editor';
import { template } from '@babel/core';
import request from '../utils/request';
import { message } from 'antd';

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
    commitList: [],
    commitID: '',
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
    // onChange更新EditorState
    updateEditorState(state, { payload }) {
      return {
        ...state,
        editorState: payload,
      }
    },
    // onChange更新Schema
    updateSchema(state, { payload }) {
      return {
        ...state,
        schema: payload,
      }
    },
    // DidMount和onSubmit更新CommitList
    updateCommitList(state, { payload }) {
      return {
        ...state,
        commitList: payload,
        commitID: payload[0].commitId,
      }
    },
    updateCommitID(state, { payload }) {
      return {
        ...state,
        commitID: payload,
      }
    },
  },
  effects: {
    *createTemplate({ defaultContent }, { call, put }) {
      const templateRequest = { id: null, content: defaultContent }

      const response = yield call(request.post, '/api/templates/new', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateRequest),
      });

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
    *updateTemplate({ targetID, content }, { call, put }) {
      const templateRequest = { id: targetID, content }
      const respone = yield call(request.put, `/api/templates/${targetID}`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateRequest),
       })
      yield put({
        type: 'getCommitList',
        targetID,
      })
      message.success('保存成功');
    },
    *getCommitList({ targetID }, { call, put }) {
      const response = yield call(request, `/api/templates/${targetID}/commits`)
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
        type: 'updateCommitID',
        payload: commitID,
      })
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
      message.success(`成功切换到版本${commitID}`)
    },
  },
};
