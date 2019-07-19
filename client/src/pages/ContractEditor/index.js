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
        {/* <div className={styles.timeLine}>
          <Timeline className={styles.timeLine}>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
          </Timeline>
        </div> */}
        <Timeline className={styles.timeLine}>
          {
            contract.commitVersionList.map(version => (
              <Timeline.Item key={version.commitId} >
                <div data-version={version} onClick={e => this.versionHandler(e.target.dataset.version)}>
                  {version.commitDate}
                </div>
              </Timeline.Item>
            ))
          }
        </Timeline>
      </Drawer>
    )

    const drawerSwitch = <div className={styles.drawerSwitch} onClick={e => this.setState({ drawerVisible: true })} />

    return (
      <div>
        {form}
        {editorDrawer}
        {drawerSwitch}
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      drawerVisible: false
    }
  }

  componentDidMount() {
    this.query = this.getCurrentHerfQuery()
    this.props.dispatch({
      type: "contract/getContract",
      targetID: this.query.id
    })
  }

  submitHandler = ({ formData }, e) => {
    const { id, name, templateID } = this.props.contract

    this.props.dispatch({
      type: "contract/updateContract",
      targetID: id,
      content: {
        name,
        formData,
        templateID
      }
    })
  }

  versionHandler = version => {
    console.log(version)
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
