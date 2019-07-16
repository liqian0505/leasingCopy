import React from 'react';
import { Button, Col, Drawer, Row } from 'antd';
// 引入富文本编辑器组件
import BraftEditor from 'braft-editor';
import Table from 'braft-extensions/dist/table';
// 引入富文本编辑器样式
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
// 引入schema编辑器组件
import schemaEditor from 'json-schema-editor-visual/dist/main.js';
import 'antd/dist/antd.css';
import 'json-schema-editor-visual/dist/main.css';
import { connect } from 'dva';
import BasicLayout from '@/layouts/BasicLayout';
import styles from './index.css';

const option = {};
const SchemaEditor = schemaEditor(option);
// 初始化表格扩展
BraftEditor.use([
  Table({
    defaultColumns: 4, // 默认列数
    defaultRows: 4, // 默认行数
    withDropdown: true, // 插入表格前是否弹出下拉菜单
    // includeEditors: ['editor-id-1'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
    // excludeEditors: ['editor-id-2'], // 指定该模块对哪些BraftEditor无效
  }),
]);

class TemplateEditor extends React.Component {
  state = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(null),
    visible: false,
    schema: this.props.template.schema,
  };

  componentDidMount() {
    this.setState({
      editorState: BraftEditor.createEditorState(this.props.template.editorState),
    })
  }

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

  submitContent = () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML();
    const stringContent = this.state.editorState.toRAW();
    const jsonContent = this.state.editorState.toRAW(true);
    console.log(htmlContent, stringContent, jsonContent);

    this.props.dispatch({
      type: "template/updateTemplate",
      targetID: this.props.template.id,
      jsonContent: jsonContent
    })
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const { dispatch } = this.props;
    const { editorState } = this.state;
    return (
      <BasicLayout>
        <div className={styles.editorContainer}>
          <Row>
            <BraftEditor
              value={editorState}
              onChange={this.handleEditorChange}
              onSave={this.submitContent}
            />
            <Drawer
              title="Schema Editor"
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
              width="50%"
            >
              <SchemaEditor
                data={JSON.stringify(this.state.schema)}
              // onChange={schema => {
              //   dispatch({ type: 'bucciarati/updateSchema', payload: JSON.parse(schema) });
              // }}
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
          {/* 另一种button排版样式
          <Row>
            <Col span={19}></Col>
            <Col span={2}>
              <Button type="primary" block onClick={this.showDrawer} >Drawer</Button>
            </Col>
            <Col span={1}></Col>
            <Col span={2}>
              <Button type="primary" block onClick={this.submitContent}>Save</Button>
            </Col>
          </Row> */}
        </div>
      </BasicLayout>
    );
  }
}

export default connect(({ template }) => ({ template }))(TemplateEditor)
