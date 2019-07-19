import React from 'react';
import { connect } from 'dva';
import { Table, Dropdown, Menu, Modal } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';

import styles from './index.css';
import CustomIcon from '@/components/Perish/CustomIcon';
import CustomInput from '@/components/Perish/CustomInput';
import template from '@/models/template';

class ContractList extends React.Component {
  render() {

    const table = <Table columns={this.columns} dataSource={this.props.contractList} rowKey="id" />
    const modalSwitch = <div className={styles.createButton} onClick={e => this.setState({ modalVisible: true })} />
    const templateItemList = this.props.templateList.map(template => (
      <div
        className={styles.templateItem}
        key={template.id}
        data-id={template.id}
        onClick={e => this.createHandler(e.target.dataset.id)}>
        {template.name}
      </div>
    ))

    const modal = (
      <Modal
        title="可用模板"
        footer={null}
        onCancel={e=>this.setState({modalVisible: false})}
        visible={this.state.modalVisible}>
        {templateItemList}
      </Modal>
    )

    return (
      <div>
        {table}
        {modalSwitch}
        {modal}
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false
    }

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
    this.setState({
      modalVisible: false
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
