import React from 'react';
import { connect } from 'dva';
import BraftEditor from 'braft-editor';
import BasicLayout from '@/layouts/BasicLayout';
import { Button, Col, Drawer, Row, Icon, Timeline, message, Spin } from 'antd';
import Form from 'react-jsonschema-form';

import 'bootstrap/dist/css/bootstrap.css';
import styles from './index.css';

var format = require('date-format');

class ContractEditor extends React.Component {

  render() {

    const { id, content, editorState, commitVersionList, currentCommitID } = this.props.contract

    const form = content.schema === null ? <Spin /> : <Form className={styles.form} schema={content.schema} formData={content.formData} onSubmit={this.submitHandler} onError={e => alert(e)} />

    const editorDrawer = (
      <Drawer title="合同填写" placement="right" width="50%" closable={false} visible={this.state.drawerVisible} onClose={e => this.setState({ drawerVisible: false })}>
        <BraftEditor className={styles.editor} value={editorState} controls={[]} readOnly />
      </Drawer>
    )

    const commitDrawer = (
      <Drawer title="历史版本" placement="left" width="30%" closable={false} visible={this.state.commitVisible} onClose={e => this.setState({ commitVisible: false })}>
        <Timeline>
          {
            commitVersionList.map(commit => (
              <Timeline.Item key={commit.commitId} color={commit.commitId === Number(currentCommitID) ? 'green' : 'blue'}>
                <div data-commitid={commit.commitId} onClick={e => this.commitHandler(e.target.dataset.commitid)} >
                  {this.dateParser(commit.commitDate)}
                </div>
              </Timeline.Item>
            ))
          }
        </Timeline>
      </Drawer>
    )

    const drawerSwitch = <div className={styles.drawerSwitch} onClick={e => this.setState({ drawerVisible: true })} />
    const commitSwitch = <div className={styles.commitSwitch} onClick={e => this.setState({ commitVisible: true })} />
    const submitSwitch = <div className={styles.submitSwitch} onClick={this.submitHandler} />

    return (
      <div>
        {form}
        {editorDrawer}
        {commitDrawer}
        {drawerSwitch}
        {submitSwitch}
        {commitSwitch}
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      drawerVisible: false,
      commitVisible: false
    }
  }

  componentDidMount() {
    this.query = this.getCurrentHerfQuery()
    if (this.query.id !== undefined) {
      this.props.dispatch({
        type: "contract/getContract",
        targetID: this.query.id
      })
    }
  }

  submitHandler = ({ formData }, e) => {
    const { id, content } = this.props.contract

    this.props.dispatch({
      type: "contract/updateContract",
      targetID: id,
      content: {
        ...content,
        formData
      }
    })
  }

  commitHandler = commitID => {
    const { id } = this.props.contract

    this.props.dispatch({
      type: "contract/rollbackContract",
      targetID: id,
      commitID,
    })
    message.success(`成功切换到版本${commitID}`)
  }

  dateParser = text => {
    const date = format.parse(format.ISO8601_FORMAT, text)
    const formatDate = format("yyyy-MM-dd hh:mm:ss", date)
    return formatDate
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

export default connect(({ contract }) => ({ contract }))(ContractEditor);
