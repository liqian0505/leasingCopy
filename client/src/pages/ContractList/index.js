import React from 'react';
import { connect } from 'dva';
import { Table, Dropdown, Menu, Modal, Row, Col, List, Card } from 'antd';
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
      // <div
      //   className={styles.templateItem}
      //   key={template.id}
      //   data-id={template.id}
      //   onClick={e => this.commitHandler(e.target.dataset.id)}>
      //   {template.name}
      // </div>
      <List.Item key={template.id}>
        <Card className={styles.templateItemCard} hoverable data-id={template.id} onClick={e => this.createHandler(e.target.dataset.id)}>
          {template.name}
        </Card>
      </List.Item>
    ))

    const templateItemListContainer = (
      <List gird={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 6 }} dataSource={templateItemList} renderItem={item=>item}/>
    )

    // const templateVersionItemList = this.props.template.commitList.map(commit => (
    //   <div
    //     className={styles.templateVersionItem}
    //     key={commit.commitId}
    //     data-templateid={this.props.template.id}
    //     data-commitid={commit.commitId}
    //     onClick={e => this.createHandler(e.target.dataset.templateid, e.target.dataset.commitid)}>
    //     {commit.commitId}</div>
    // ))

    const modal = (
      <Modal title="可用模板" footer={null} onCancel={e => this.setState({ modalVisible: false })} visible={this.state.modalVisible}>
        {templateItemListContainer}
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
        title: '合同名称', key: 'id',
        render: record => <CustomInput record={record} defaultValue={record.name} onChange={(id, record) => this.updateHandler(id, record)} />
      },
      {
        title: '选项',
        render: record => {
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
    this.props.dispatch({ type: 'templateList/getTemplateList' })
  }

  /* 编辑按钮事件响应 */
  editHandler = id => {
    this.props.dispatch({
      type: "contract/getContract",
      targetID: id,
      jump: true
    })
  }

  /* 删除按钮事件响应 */
  deleteHandler = id => {
    this.props.dispatch({
      type: "contractList/deleteContract",
      targetID: id
    })
  }

  /* 创建按钮事件响应 */
  createHandler = (id, commitID) => {
    // this.props.dispatch({
    //   type: "contractList/createContract",
    //   templateID: id,
    //   commitID
    // })
    // this.setState({
    //   modalVisible: false
    // })

    console.log(id)
  }

  /* 修改名称事件响应 */
  updateHandler = (id, record) => {
    this.props.dispatch({
      type: "contract/updateContract",
      targetID: id,
      content: record
    })
  }

  /* 查看模板版本事件响应 */
  commitHandler = templateID => {
    this.props.dispatch({
      type: "template/getTemplate",
      targetID: templateID
    })
    this.props.dispatch({
      type: "template/getCommitList",
      targetID: templateID
    })
  }

  /* 解析当前页面URL参数 */
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

export default connect(({ contractList, templateList, template }) => ({ contractList, templateList, template }))(ContractList);
