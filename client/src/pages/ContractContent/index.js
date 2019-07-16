import React from 'react';
import { Button, Col, Drawer, Row } from 'antd';
import BraftEditor from 'braft-editor';
import Form from 'react-jsonschema-form';
import BasicLayout from '@/layouts/BasicLayout';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './index.css';
import jp from 'jsonpath';
import { connect } from 'dva';

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
  state = {
    editorState: BraftEditor.createEditorState('<p>empty</p>'),
    visible: false,
    schema: {
      type: 'object',
      title: 'empty object',
      properties: {},
    },
    formData: null,
  };

  // componentDidMount() {
  //   console.log(this.props.template)
  //   this.setState({
  //     editorState: BraftEditor.createEditorState(this.props.template.editorState),
  //     schema: this.props.template.schema,
  //     formData: this.props.formData,
  //   })
  // }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const controls = [];
    const { editorState, schema, formData } = this.state
    return (
      <BasicLayout>
        <div className={styles.editorContainer}>
          <Row>
            <BraftEditor
              value={editorState}
              readOnly
              controls={controls}
              style={{ height: '500px' }}
            />
            <Drawer
              title="Form Editor"
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
              width="50%"
            >
              <Form
                schema={schema}
                formData={formData}//{getDefaultData(schema)}
                // onChange={e => { return }}
                // onSubmit={e => dispatch({ type: 'bucciarati/updateData', payload: e.formData })}
                onError={e => console.log(e)}
              />
            </Drawer>
          </Row>
          <Row>
            <Col span={20}></Col>
            <Col span={2}>
              <div className={styles.buttonContainer}>
                <Button type="primary" block onClick={this.showDrawer}>
                  Drawer
                </Button>
              </div>
            </Col>
            <Col span={2}>
              <div className={styles.buttonContainer}>
                <Button type="primary" block onClick={this.submitContent}>
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </BasicLayout>
    );
  }
}

export default connect(({ template, contract }) => ({
  template: template.template, 
  formData: contract.formData,
}))(ContractEditor);
