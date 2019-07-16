import React from 'react';
import { connect } from 'dva';
import { Table, Button, Icon, Divider } from 'antd';
// import BasicLayout from '@/layouts/BasicLayout';

import styles from './index.css';
import CustomDiv from '@/components/Perish/CustomDiv';

const ContractList = props => {
  const { contractList, dispatch } = props;

  if (contractList === null) {
    dispatch({
      type: 'contractList/getContractList',
    });
  }

  const columns = [
    {
      title: '模版名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '模板样式',
      dataIndex: 'style',
      key: 'style',
    },
    {
      title: '选项',
      render: record => (
        <div>
          <CustomDiv
            id={record.id}
            onClick={id => {
              dispatch({
                type: "contract/getContract",
                targetID: id
              })
            }}
          >
            <a>
              <Icon type="edit" />
            </a>
          </CustomDiv>
          <Divider type="vertical" style={{ opacity: 0 }} />
          <CustomDiv
            id={record.id}
            onClick={id => {
              console.log(id);
            }}
          >
            <a>
              <Icon type="delete" />
            </a>
          </CustomDiv>
        </div>
      ),
    },
  ];

  const source = contractList !== null ? contractList : [];

  return (
      <Table columns={columns} dataSource={source} rowKey="id" />
  );
};

export default connect(({ contractList }) => ({
  contractList,
}))(ContractList);
