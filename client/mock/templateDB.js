const templateData = [
  {
    id: "1",
    name: '模板一',
    style: '样式一',
  },
  {
    id: "2",
    name: '模板二',
    style: '样式二',
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
