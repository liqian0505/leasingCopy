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
          return (
            <CustomInput placeholder="未命名合同"/>
          )
        }
      },
      {
        title: '选项', render: record => {
          const parameters = { id: record.id, templateID: record.templateID }
          return (
            <div>
              <CustomIcon type="edit" onClick={this.editHandler} parameters={parameters} />
              <CustomIcon type="delete" onClick={this.deleteHandler} parameters={parameters} />
            </div>
          )
        }
      }
    ]
  }

  componentDidMount() { this.props.dispatch({ type: 'contractList/getContractList' }) }

  editHandler = parameters => {
    this.props.dispatch({
      type: "contract/getContract",
      targetID: parameters.id
    })
  }

  deleteHandler = parameters => {
    this.props.dispatch({
      type: "contractList/deleteContract",
      targetID: parameters.id
    })
  }

  createHandler = () => {
    this.props.dispatch({
      type: "contractList/createContract"
    })
  }
}

export default connect(({ contractList }) => ({ contractList }))(ContractList);
