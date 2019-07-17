import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';

import styles from './index.css';
import CustomIcon from '@/components/Perish/CustomIcon';

class ContractList extends React.Component {
  render() {
    return (
      <BasicLayout>
        <Table columns={this.columns} dataSource={this.props.contractList} rowKey="id" />
      </BasicLayout>
    )
  }

  constructor(props) {
    super(props)

    this.columns = [
      { title: '合同名称', dataIndex: 'name', key: 'name' },
      { title: '合同样式', dataIndex: 'style', key: 'style' },
      {
        title: '选项', render: record => {

          const parameters = { 
            id: record.id, 
            templateID: record.templateID 
          }

          return (
            <div>
              <CustomIcon type="edit" onClick={this.editHandler} parameters={parameters} />
              <CustomIcon type="delete" onClick={this.deleteHandler} parameters={parameters}/>
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
}

export default connect(({ contractList }) => ({ contractList }))(ContractList);
