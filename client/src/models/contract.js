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
    formData: null,
    editorState: null
  },
  reducers: {
    setContractState(_, { newState }) { return newState }
  },
  effects: {
    *getContract({ targetID }, { call, put }) {
      // const { id, formData, schema, templateID } = yield call(request, `/contract/${targetID}`)
      // const { editorContent } = yield call(request, `/template/${templateID}`)

      // yield put({
      //   type: "setContractState",
      //   newState: {
      //     id,
      //     formData,
      //     schema,
      //     editorState: BraftEditor.createEditorState(editorContent)
      //   }
      // })

      // router.push("/ContractEditor?id=" + id)

      const editorContent = {
        blocks: [{
          key: '3b1pq',
          text: 'empty',
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
          schema: {
            type: 'object',
            title: 'empty object',
            properties: {},
          },
          editorState: BraftEditor.createEditorState(editorContent)
        }
      })
    },
    *updateContract({ targetID, newContarct }, { call, put }) {
      const response = yield call(request, `/contract/${targetID}`, { body: newContarct })
    }
  },
};
