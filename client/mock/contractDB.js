const contractData = [
  {
    id: "1",
    name: '模板一',
    style: '样式一',
    formData: {

    },
    schema: {
      type: 'object',
      title: 'empty object',
      properties: {},
    },
    templateID: "1"
  },
  {
    id: "2",
    name: '模板二',
    style: '样式二',
    formData: {

    },
    schema: {
      type: 'object',
      title: 'empty object',
      properties: {},
    },
    templateID: "2"
  },
  {
    id: "3",
    name: '模板三',
    style: '样式三',
    formData: {

    },
    schema: {
      type: 'object',
      title: 'empty object',
      properties: {},
    },
    templateID: "3"
  },
];

export default {
  'GET /contract/all': contractData.map(data => {
    return {
      id: data.id,
      name: data.name,
      style: data.style,
      templateID: data.templateID
    }
  }),
  'GET /contract': (req, res) => {
    const { query } = req
    res.send(contractData.find(data => data.id === query.id))
  },
  'POST /contract': (req, res) => { },
};
