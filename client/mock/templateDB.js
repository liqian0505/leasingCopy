const templateData = [
  {
    id: 1,
    name: '模板一',
    style: '样式一',
  },
  {
    id: 2,
    name: '模板二',
    style: '样式二',
  },
];

export default {
  'GET /template/all': templateData,
  'POST /template': (req, res) => {},
};
