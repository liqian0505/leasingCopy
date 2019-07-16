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
    editorState: {"blocks":[{"key":"3b1pq","text":"empty","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9pjup","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dqggb","text":"","type":"table-cell","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"tableKey":"9t6ea","colIndex":0,"rowIndex":0,"colSpan":1,"rowSpan":1}},{"key":"fjd75","text":"","type":"table-cell","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"tableKey":"9t6ea","colIndex":1,"rowIndex":0,"colSpan":1,"rowSpan":1}},{"key":"5h2cc","text":"","type":"table-cell","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"tableKey":"9t6ea","colIndex":2,"rowIndex":0,"colSpan":1,"rowSpan":1}},{"key":"5kdnf","text":"","type":"table-cell","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"tableKey":"9t6ea","colIndex":3,"rowIndex":0,"colSpan":1,"rowSpan":1}},{"key":"6chq8","text":"","type":"table-cell","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"tableKey":"9t6ea","colIndex":0,"rowIndex":1,"colSpan":1,"rowSpan":1}},{"key":"ddrrb","text":"","type":"table-cell","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"tableKey":"9t6ea","colIndex":1,"rowIndex":1,"colSpan":1,"rowSpan":1}},{"key":"3htdh","text":"","type":"table-cell","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"tableKey":"9t6ea","colIndex":2,"rowIndex":1,"colSpan":1,"rowSpan":1}},{"key":"95oti","text":"","type":"table-cell","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"tableKey":"9t6ea","colIndex":3,"rowIndex":1,"colSpan":1,"rowSpan":1}},{"key":"99lo4","text":"","type":"table-cell","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"tableKey":"9t6ea","colIndex":0,"rowIndex":2,"colSpan":1,"rowSpan":1}},{"key":"3rc1m","text":"","type":"table-cell","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"tableKey":"9t6ea","colIndex":1,"rowIndex":2,"colSpan":1,"rowSpan":1}},{"key":"e810s","text":"","type":"table-cell","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"tableKey":"9t6ea","colIndex":2,"rowIndex":2,"colSpan":1,"rowSpan":1}},{"key":"3l4nv","text":"","type":"table-cell","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"tableKey":"9t6ea","colIndex":3,"rowIndex":2,"colSpan":1,"rowSpan":1}},{"key":"f2u8m","text":"","type":"table-cell","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"tableKey":"9t6ea","colIndex":0,"rowIndex":3,"colSpan":1,"rowSpan":1}},{"key":"40nap","text":"","type":"table-cell","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"tableKey":"9t6ea","colIndex":1,"rowIndex":3,"colSpan":1,"rowSpan":1}},{"key":"10a41","text":"","type":"table-cell","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"tableKey":"9t6ea","colIndex":2,"rowIndex":3,"colSpan":1,"rowSpan":1}},{"key":"edb9p","text":"","type":"table-cell","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"tableKey":"9t6ea","colIndex":3,"rowIndex":3,"colSpan":1,"rowSpan":1}},{"key":"9295e","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}},//{ blocks: [{ key: '3b1pq', text: 'empty', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {} }], entityMap: {} },
    schema: {
      type: 'object',
      title: 'empty object',
      properties: {},
    },
  },
  {
    id: "3",
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
  'GET /template/all': templateData.map(data => { return { id: data.id, name: data.name, style: data.style } }),
  'GET /template': (req, res) => {
    const { query } = req
    res.send(templateData.find(data => data.id === query.id))
  },
  'POST /template': (req, res) => { },
};
