const contractData = [
  {
    id: "1",
    name: '模板一',
    style: '样式一',
    formData: {

    },
  },
  {
    id: "2",
    name: '模板二',
    style: '样式二',
    formData: {

    },
  },
  {
    id: "3",
    name: '模板三',
    style: '样式三',
    formData: {

    },
  },
];

export default {
  'GET /contract/all': contractData.map(data => { return { id: data.id, name: data.name, style: data.style } }),
  'GET /contract': (req, res) => {
    const { query } = req
    res.send(contractData.find(data => data.id === query.id))
  },
  'POST /contract': (req, res) => { },
};
