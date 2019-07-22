import React from 'react';
import { connect } from 'dva';
import { Table, Dropdown, Menu, Modal, List, Card, Row, Col } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';

import styles from './index.css';
import CustomIcon from '@/components/Perish/CustomIcon';
import CustomInput from '@/components/Perish/CustomInput';

class ContractList extends React.Component {
  render() {
    const { templateList, contractList } = this.props

    /* 已创建合同列表，渲染方式见构造函数 columns，数据源为 model.contractList */
    const table = <Table columns={this.columns} dataSource={contractList} rowKey="id" />

    /* 可选模板列表 */
    const templateItemList = []
    const length = templateList.length

    for (var i = 0; i < length; i += 3) {
      templateItemList.push((
        <Row className={styles.templateItemRow} key={'template-row-' + i} gutter={8}>
          <Col span={8}>{this.itemParser(templateList[i])}</Col>
          <Col span={8}>{this.itemParser(templateList[i + 1])}</Col>
          <Col span={8}>{this.itemParser(templateList[i + 2])}</Col>
        </Row>
      ))
    }

    const modal = (
      <Modal title="模板列表" footer={null} onCancel={e => this.setState({ modalVisible: false })} visible={this.state.modalVisible}>
        {templateItemList}
      </Modal>
    )

    /* ‘模板列表’ 对话框开关，点击开启对话框，选择目标模板创建新合同 */
    const modalSwitch = <div className={styles.createButton} onClick={e => {
      this.props.dispatch({ type: 'templateList/getTemplateList' })
      this.setState({ modalVisible: true })
    }} />

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
    this.props.dispatch({
      type: "contractList/createContract",
      templateID: id
    })
    this.setState({
      modalVisible: false
    })
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

  /* 模板卡片解析器 */
  itemParser = template => template === undefined ? null : (
    <Card>
      <div className={styles.templateItemCard} data-id={template.id} onClick={e => this.createHandler(e.target.dataset.id)}>
        {template.name}
      </div>
    </Card>
  )
}

export default connect(({ contractList, templateList, template }) => ({ contractList, templateList, template }))(ContractList);
