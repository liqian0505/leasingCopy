import React from 'react';
import { Button, Col, Drawer, Row } from 'antd';
import BraftEditor from 'braft-editor';
import Form from 'react-jsonschema-form';
import BasicLayout from '@/layouts/BasicLayout';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './index.css';
import jp from 'jsonpath';

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

export default class ContractEditor extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(null),
    visible: false,
    // 后续转移到models中
    schema: {
      type: 'object',
      title: 'empty object',
      properties: {},
    },
  };

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
    return (
      <BasicLayout>
        <div className={styles.editorContainer}>
          <Row>
            <BraftEditor
              value={this.state.editorState}
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
                schema={this.state.schema}
                formData={getDefaultData(this.state.schema)}
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
