import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';

import styles from './index.css';
import CustomIcon from '@/components/Perish/CustomIcon';
import CustomInput from '@/components/Perish/CustomInput';

class ContractList extends React.Component {
  render() {

    const table = <Table columns={this.columns} dataSource={this.props.contractList} rowKey="id" />
    const createButton = <div className={styles.createButton} onClick={e => this.createHandler()} />

    return (
      <BasicLayout>
        {table}
        {createButton}
      </BasicLayout>
    )
  }

  constructor(props) {
    super(props)

    this.columns = [
      {
        title: '合同名称', key: 'id', render: record => {
          return <CustomInput id={record.id} placeholder="未命名合同" onChange={(id, name) => console.log(id, name)} />
        }
      },
      {
        title: '选项', render: record => {
          const parameters = { id: record.id, templateID: record.templateID }
          return (
            <div>
              <CustomIcon type="edit" onClick={parameters => this.editHandler(parameters.id)} parameters={parameters} />
              <CustomIcon type="delete" onClick={parameters => this.deleteHandler(parameters.id)} parameters={parameters} />
            </div>
          )
        }
      }
    ]
  }

  componentDidMount() {
    this.query = this.getCurrentHerfQuery()
    this.props.dispatch({ type: 'contractList/getContractList', templateID: this.query.templateID })
  }

  editHandler = id => {
    this.props.dispatch({
      type: "contract/getContract",
      targetID: id
    })
  }

  deleteHandler = id => {
    this.props.dispatch({
      type: "contractList/deleteContract",
      targetID: id
    })
  }

  createHandler = () => {
    this.props.dispatch({
      type: "contractList/createContract"
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

export default connect(({ contractList }) => ({ contractList }))(ContractList);
