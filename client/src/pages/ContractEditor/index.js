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
    console.log(contract)
    debugger

    const form = <Form className={styles.form} schema={contract.schema} formData={contract.formData} onSubmit={this.submitHandler} onError={e => alert(e)} />

    const editorDrawer = (
      <Drawer title="合同填写" placement="right" width="50%" closable={false} visible={this.state.drawerVisible} onClose={e => this.setState({ drawerVisible: false })}>
        <BraftEditor className={styles.editor} value={contract.editorState} controls={[]} readOnly />
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
    const { id, name, editorContent, templateID } = this.props.contract

    var copyContent = JSON.parse(JSON.stringify(editorContent))

    const data = formData
    jp.apply(copyContent, '$..text', value => eval('`' + value + '`'))
    // console.log(jp.query(copyContent,'$..text'))
    // debugger
    this.props.dispatch({
      type: "contract/updateContract",
      targetID: id,
      content: {
        name,
        formData,
        templateID
      },
      newEditorState: BraftEditor.createEditorState(copyContent)
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
