import React from 'react';
import { connect } from 'dva';
import { Table, Button, Icon, Divider, Row, Col } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';

import styles from './index.css';
import CustomIcon from '@/components/Perish/CustomIcon';
import CustomInput from '@/components/Perish/CustomInput';

class TemplateList extends React.Component {
  render() {
    return (
      <BasicLayout>
        <Row className={styles.createButton}>
          <Button type="primary" icon="plus" onClick={this.createHandler}>New Template</Button>
        </Row>
        <Row><Table columns={this.columns} dataSource={this.props.templateList} rowKey="id" /></Row>
      </BasicLayout>
    )
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '模版名称',
        dataIndex: 'name',
        key: 'name',
        render: (name, record) => (
          <CustomInput id={record.id} defaultValue={name} onChange={(id, value) => console.log(id, value)} />
        ),
      },
      {
        title: '选项',
        render: record => {
          const parameters = {
            id: record.id,
          }

          return (
            <div>
              <CustomIcon parameters={parameters} type="edit" onClick={parameters => this.editHandler(parameters)} />
              <CustomIcon parameters={parameters} type="delete" onClick={parameters => this.deleteHandler(parameters)} />
              <CustomIcon parameters={parameters} type="bars" onClick={parameters => this.filterHandler(parameters)} />
            </div>
          )
        },
      },
    ]
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'templateList/getTemplateList',
    });
  }

  createHandler = () => {
    this.props.dispatch({
      type: 'template/createTemplate',
      name: '未命名模板',
      defaultContent: {
        editorContent: {},
        schemaContent: {
          type: 'object',
          title: 'empty object',
          properties: {},
        },
      },
    })
  }

  editHandler = parameters => {
    this.props.dispatch({
      type: 'template/getTemplate',
      targetID: parameters.id,
    })
  }

  deleteHandler = parameters => {
    this.props.dispatch({
      type: 'templateList/deleteTemplate',
      targetID: parameters.id,
    })
  }

  filterHandler = parameters => {
    this.props.dispatch({
      type: 'contractList/getContractList',
      templateID: parameters.id,
    })
  }
}

export default connect(({ templateList }) => ({ templateList }))(TemplateList);
