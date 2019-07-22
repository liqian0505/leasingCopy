import React from 'react';
import { connect } from 'dva';
import { Button, Icon, Row, Col, List, Card } from 'antd';
// import { symbol } from 'prop-types';
import BasicLayout from '@/layouts/BasicLayout';
import Cookies from 'js-cookie';

import styles from './index.css';
import CustomIcon from '@/components/Perish/CustomIcon';
import CustomInput from '@/components/Perish/CustomInput';

class TemplateList extends React.Component {
  constructor(props) {
    super(props)
    Cookies.set('username', 'C')
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
      jump: true,
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
      jump: true,
    })
  }

  updateHandler = (id, content) => {
    this.props.dispatch({
      type: 'template/updateTemplate',
      targetID: id,
      content,
    })
  }

  render() {
    const { templateList } = this.props;
    // console.log(templateList.length)
    const ItemList = templateList.map(item => (
      <List.Item key={item.id}>
        <Card className={styles.templateCard} hoverable bodyStyle={{ height: '100px' }}
          actions={[
            <CustomIcon title="编辑" parameters={item} type="edit" onClick={parameters => this.editHandler(parameters)} />,
            <CustomIcon title="删除" parameters={item} type="delete" onClick={parameters => this.deleteHandler(parameters)} />,
            <CustomIcon title="查看合同列表" parameters={item} type="bars" onClick={parameters => this.filterHandler(parameters)} />,
            <Icon type="ellipsis" />,
          ]}
        >
          {item.name}
          {/* <CustomInput record={item} defaultValue={item.name} onChange={(id, content) => this.updateHandler(id, content)} /> */}
        </Card>
      </List.Item>
    ))

    ItemList.push(
      <List.Item key="default-add-item">
        <Button type="dashed" onClick={this.createHandler} className={styles.templateCard} style={{ height: '150px' }}>
          <Icon type="plus" /> Add template
        </Button>
      </List.Item>,
    )

    ItemList.reverse()

    return (
      <div className={styles.container} >
        <List grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 6,
          }}
          dataSource={ItemList}
          renderItem={item => item}
        />
      </div >
    )
  }
}

export default connect(({ templateList }) => ({ templateList }))(TemplateList);
