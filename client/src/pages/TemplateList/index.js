import React from 'react';
import { connect } from 'dva';
import { Table, Button, Icon, Divider, Row, Col, Tooltip } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';

import styles from './index.css';
import CustomIcon from '@/components/Perish/CustomIcon';
import CustomInput from '@/components/Perish/CustomInput';

class TemplateList extends React.Component {
  render() {
    return (
      <div>
        <Row className={styles.createButton}>
          <Button type="primary" icon="plus" onClick={this.createHandler}>New Template</Button>
        </Row>
        <Row><Table columns={this.columns} dataSource={this.props.templateList} rowKey="id" /></Row>
      </div>
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
          <CustomInput record={record} defaultValue={name} onChange={(id, content) => this.updateHandler(id, content)} />
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
              <CustomIcon title="编辑" parameters={parameters} type="edit" onClick={parameters => this.editHandler(parameters)} />
              <CustomIcon title="删除" parameters={parameters} type="delete" onClick={parameters => this.deleteHandler(parameters)} />
              <CustomIcon title="查看合同列表" parameters={parameters} type="bars" onClick={parameters => this.filterHandler(parameters)} />
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
      defaultContent: {
        name: '未命名模板',
        editorContent: {},
        schema: {
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

  updateHandler = (id, content) => {
    this.props.dispatch({
      type: 'template/updateTemplate',
      targetID: id,
      content: content
    })
  }
}

export default connect(({ templateList }) => ({ templateList }))(TemplateList);
