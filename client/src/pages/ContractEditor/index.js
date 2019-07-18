import React from 'react';
import jp from 'jsonpath';
import { connect } from 'dva';
import BraftEditor from 'braft-editor';
import BasicLayout from '@/layouts/BasicLayout';
import { Button, Col, Drawer, Row, Icon } from 'antd';
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

    const editor = (
      <BraftEditor
        className={styles.editor}
        value={contract.editorState}
        controls={[]}
        readOnly />
    )

    const drawer = (
      <Drawer
        title="合同填写"
        placement="right"
        width="50%"
        closable={false}
        visible={this.state.drawerVisible}
        onClose={e => this.setState({ drawerVisible: false })}>
        <Form schema={contract.schema} formData={contract.formData} onError={e => alert(e)} />
      </Drawer>
    )

    const drawerSwitch = <div className={styles.drawerSwitch} onClick={e => this.setState({ drawerVisible: true })} />
    const commitSwitch = <div className={styles.commitSwitch} onClick={e => this.submitContent} />

    return (
      <BasicLayout>
        {editor}
        {drawer}
        {drawerSwitch}
        {commitSwitch}
      </BasicLayout>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      drawerVisible: false
    }
  }

  componentDidMount() {
    var query = this.getCurrentHerfQuery()

    if (query.id !== undefined) {
      this.props.dispatch({
        type: "contract/getContract",
        targetID: query.id
      })
    }
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

export default connect(({ contract, template }) => ({ contract, template }))(ContractEditor);
