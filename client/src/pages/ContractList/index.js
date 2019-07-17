import React from 'react';
import { connect } from 'dva';
import { Table, Button, Icon, Divider } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
import styles from './index.css';
import CustomIcon from '@/components/Perish/CustomIcon';

const ContractList = props => {
  const { contractList, dispatch } = props;

  if (contractList === null) {
    dispatch({
      type: 'contractList/getContractList',
    });
  }

  const columns = [
    {
      title: '合同名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '合同模板',
      dataIndex: 'style',
      key: 'style',
    },
    {
      title: '选项',
      render: record => (
        <div>
          <CustomIcon id={record.id} type="edit" onClick={id => { dispatch({ type: "contract/getContract", targetID: id }) }}/>
          <Divider type="vertical" style={{ opacity: 0 }} />
          <CustomIcon id={record.id} type="delete" onClick={id => { dispatch({ type: "contract/getContract", targetID: id }) }}/>
        </div>
      ),
    },
  ];

  const source = contractList !== null ? contractList : [];

  return (
    <BasicLayout>
      <Table columns={columns} dataSource={source} rowKey="id" />
    </BasicLayout>
  );
};

export default connect(({ contractList }) => ({
  contractList,
}))(ContractList);
