const templateData = [
  {
    id: "1",
    name: '模板一',
    style: '样式一',
    editorState: {
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
    },
    schema: {
      type: 'object',
      title: 'empty object',
      properties: {},
    },
  },
  {
    id: "2",
    name: '模板二',
    style: '样式二',
    editorState: { blocks: [{ key: '3b1pq', text: 'empty', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {} }], entityMap: {} },
    schema: {
      type: 'object',
      title: 'empty object',
      properties: {},
    },
  },
  {
    id: 3,
    name: '模板三',
    style: '样式三',
    editorState: {
      blocks: [{
        key: '3b1pq',
        text: 'example text',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [{ offset: 2, length: 2, style: 'BOLD' }, { offset: 4, length: 3, style: 'ITALIC' }, { offset: 9, length: 2, style: 'COLOR-C0392B' }],
        entityRanges: [],
        data: {},
      }],
      entityMap: {},
    },
    schema: {
      type: 'object',
      title: 'empty object',
      properties: {},
    },
  },
];

export default {
<<<<<<< HEAD
  'GET /template/all': templateData.map(data => { return { id: data.id, name: data.name, style: data.style } }),
  'GET /template': (req, res) => {
    const { query } = req
    res.send(templateData.find(data => data.id === query.id))
  },
=======
  'GET /template/all': templateData,
>>>>>>> 95ac5d6422e049e73389b17943f12d079dda59ab
  'POST /template': (req, res) => { },
};
