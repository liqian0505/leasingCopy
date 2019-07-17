import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';

import styles from './index.css';
import CustomIcon from '@/components/Perish/CustomIcon';

class TemplateList extends React.Component {
  render() {
    return (
      <BasicLayout>
        <Table columns={this.columns} dataSource={this.props.templateList} rowKey="id" />
      </BasicLayout>
    )
  }

  constructor(props) {
    super(props)

    this.columns = [
      { title: '模版名称', dataIndex: 'name', key: 'name' },
      { title: '模板样式', dataIndex: 'style', key: 'style' },
      {
        title: '选项', render: record => (
          <div>
            <CustomIcon id={record.id} type="edit" onClick={this.editHandler} />
            <CustomIcon id={record.id} type="delete" onClick={this.deleteHandler} />
            <CustomIcon id={record.id} type="bars" onClick={this.filterHandler} />
          </div>
        )
      }
    ]
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'templateList/getTemplateList',
    });
  }

  editHandler = id => {
    this.props.dispatch({
      type: "template/getTemplate",
      targetID: id
    })
  }

  deleteHandler = id => {
    this.props.dispatch({
      type: "templateList/deleteTemplate",
      targetID: id
    })
  }

  filterHandler = id => {
    this.props.dispatch({
      type: "contractList/filterContract"
    })
  }
}

export default connect(({ templateList }) => ({ templateList }))(TemplateList);
