import React from 'react';
import { connect } from 'dva';
import { Table, Divider, Tag } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';

// class TemplateList extends React.PureComponent {
//   render() {
//     const columns = [{ title: '模版名称', dataIndex: 'name', key: 'name', render }];

//     return <BasicLayout></BasicLayout>;
//   }
// }
const TemplateList = props => {
  const { templateList } = props;

  return <BasicLayout></BasicLayout>;
};

export default connect(({ templateList, templateEditorState }) => ({
  templateList,
  templateEditorState,
}))(TemplateList);
