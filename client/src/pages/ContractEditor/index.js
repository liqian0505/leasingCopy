import React from 'react';
import { connect } from 'dva';
import BraftEditor from 'braft-editor';
import BasicLayout from '@/layouts/BasicLayout';
import { Button, Col, Drawer, Row, Icon, Timeline } from 'antd';
import Form from 'react-jsonschema-form';

import 'bootstrap/dist/css/bootstrap.css';
import styles from './index.css';

const getDefaultData = schema => {
  const data = {};
  const { properties } = schema;
  Object.keys(properties).forEach(item => {
    switch (properties[item].type) {
      case 'string':
        data[item] = '';
        break;
      case 'number':
        data[item] = 0;
        break;
      case 'array':
        data[item] = [];
        break;
      case 'boolean':
        data[item] = false;
        break;
      case 'integer':
        data[item] = 0;
        break;
      case 'object':
        data[item] = getDefaultData(properties[item]);
        break;
      default:
        console.log(properties[item].type);
        break;
    }
  });
  return data;
};

class ContractEditor extends React.Component {

  render() {

    const { contract } = this.props

    const form = <Form className={styles.form} schema={contract.schema} formData={contract.formData} onSubmit={this.submitHandler} onError={e => alert(e)} />

    const editorDrawer = (
      <Drawer title="合同填写" placement="right" width="50%" closable={false} visible={this.state.drawerVisible} onClose={e => this.setState({ drawerVisible: false })}>
        <BraftEditor className={styles.editor} value={contract.editorState} controls={[]} readOnly />
      </Drawer>
    )

    const commitDrawer = (
      <Drawer title="历史版本" placement="left" width="30%" closable={false} visible={this.state.commitVisible} onClose={e => this.setState({ commitVisible: false })}>
        <Timeline className={styles.timeLine}>
          {
            contract.commitVersionList.map(version => (
              <Timeline.Item key={version.commitId} >
                <div data-commitid={version.commitId} onClick={e => this.versionHandler(e.target.dataset.commitid)}>
                  {version.commitDate}
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
    const { contract } = this.props
    delete contract['id']
    console.log(contract)

    this.props.dispatch({
      type: "contract/updateContract",
      targetID: id,
      content: {
        ...contract,
        formData
      }
    })
  }

  versionHandler = commitID => {
    this.dispatch({
      type: "contract/rollbackContract",
      targetID: this.props.contract.id,
      commitID
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

export default connect(({ contract }) => ({ contract }))(ContractEditor);
