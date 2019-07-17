import React from 'react';
import { connect } from 'dva';
import { Table, Button, Icon, Divider } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
import router from 'umi/router'

import styles from './index.css';
import CustomDiv from '@/components/Perish/CustomDiv';

const TemplateList = props => {
  const { templateList, dispatch } = props;

  if (templateList === null) {
    dispatch({
      type: 'templateList/getTemplateList',
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
                type: "template/getTemplate",
                targetID: id
              })
              router.push("/TemplateContent")
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

  const source = templateList !== null ? templateList : [];

  return (
    <BasicLayout>
      <Table columns={columns} dataSource={source} rowKey="id" />
    </BasicLayout>
  );
};

export default connect(({ templateList }) => ({
  templateList,
}))(TemplateList);
