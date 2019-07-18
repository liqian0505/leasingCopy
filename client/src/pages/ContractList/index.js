import React from 'react';
import { connect } from 'dva';
import { Table, Dropdown, Menu } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';

import styles from './index.css';
import CustomIcon from '@/components/Perish/CustomIcon';
import CustomInput from '@/components/Perish/CustomInput';

class ContractList extends React.Component {
  render() {

    const table = <Table columns={this.columns} dataSource={this.props.contractList} rowKey="id" />
    const menu = (
      <Menu onClick={({ key }) => this.createHandler(key)}>
        {this.props.templateList.map(template => (<Menu.Item key={template.id} >{template.name}</Menu.Item>))}
      </Menu>
    )

    const dropdown = (
      <Dropdown overlay={menu} trigger={['click']}>
        <div className={styles.createButton} />
      </Dropdown>
    )

    return (
      <div>
        {table}
        {dropdown}
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.columns = [
      {
        title: '合同名称', key: 'id', render: (id, record) => {
          return <CustomInput record={record} defaultValue={record.name} onChange={(id, record) => this.updateHandler(id, record)} />
        }
      },
      {
        title: '选项', render: record => {
          const parameters = { id: record.id, templateID: record.templateID }
          return (
            <div>
              <CustomIcon type="edit" onClick={parameters => this.editHandler(parameters.id)} parameters={parameters} />
              <CustomIcon type="delete" onClick={parameters => this.deleteHandler(parameters)} parameters={parameters} />
            </div>
          )
        }
      }
    ]
  }

  componentDidMount() {
    this.query = this.getCurrentHerfQuery()
    this.props.dispatch({ type: 'contractList/getContractList', templateID: this.query.templateID })
    this.props.dispatch({ type: 'templateList/getTemplateList' })
  }

  editHandler = id => {
    this.props.dispatch({
      type: "contract/getContract",
      targetID: id,
      jump: true
    })
  }

  deleteHandler = parameters => {
    this.props.dispatch({
      type: "contractList/deleteContract",
      targetID: parameters.id,
      templateID: parameters.templateID
    })
  }

  createHandler = id => {
    this.props.dispatch({
      type: "contractList/createContract",
      templateID: id
    })
  }

  updateHandler = (id, record) => {
    this.props.dispatch({
      type: "contract/updateContract",
      targetID: id,
      content: record
    })
  }

  getCurrentHerfQuery = () => {
    var regex = /[^&=?]+=[^&]*/g;
    var parsedQuery = window.location.href.match(regex);
    var query = {}

    if (parsedQuery !== null) {
      parsedQuery.forEach((pairText) => {
        var pair = pairText.split("=")
        query[pair[0]] = pair[1]
      })
    }

    return query
  }
}

export default connect(({ contractList, templateList }) => ({ contractList, templateList }))(ContractList);
