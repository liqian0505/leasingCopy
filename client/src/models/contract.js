import request from '../utils/request'
import router from 'umi/router'
import BraftEditor from 'braft-editor'

export default {
  namespace: 'contract',
  state: {
    id: null,
    schema: {
      type: 'object',
      title: 'empty object',
      properties: {},
    },
    templateID: null,
    formData: null,
    editorState: null
  },
  reducers: {
    setContractState(_, { newState }) { return newState }
  },
  effects: {
    *getContract({ targetID }, { call, put }) {
      // const { id, formData, templateID } = yield call(request, `/contract/${targetID}`)
      // const { editorContent, schema } = yield call(request, `/template/${templateID}`)

      // yield put({
      //   type: "setContractState",
      //   newState: {
      //     id,
      //     formData,
      //     schema,
      //     templateID,
      //     editorState: BraftEditor.createEditorState(editorContent)
      //   }
      // })

      // router.push("/ContractEditor?id=" + id)

      const editorContent = {
        blocks: [{
          key: '3b1pq',
          text: 'empty${data.field_1}',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }],
        entityMap: {}
      }

      yield put({
        type: "setContractState",
        newState: {
          id: '10',
          formData: {

          },
          schema: { "type": "object", "title": "empty object", "properties": { "field_1": { "type": "string" }, "field_2": { "type": "string" } }, "required": ["field_1", "field_2"] },
          editorState: BraftEditor.createEditorState(editorContent)
        }
      })
    },
    *updateContract({ targetID, content }, { call }) {
      console.log(targetID, content)
      const response = yield call(request.put, `/api/contracts/${targetID}`, { body: content })
    }
  },
};
