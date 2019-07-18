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
// import BasicLayout from '@/layouts/BasicLayout';
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
    visible: false,
  };

  componentDidMount() {
    // debugger
    let query = this.getCurrentHerfQuery()

    if (query.id !== undefined) {
      this.props.dispatch({
        type: 'template/getTemplate',
        targetID: query.id,
      })
    }
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
    // const htmlContent = this.state.editorState.toHTML();
    // const stringContent = this.state.editorState.toRAW();
    console.log(this.props.template.editorState)
    const jsonContent = this.props.template.editorState.toRAW(true);
    console.log(this.props.template.schema);

    this.props.dispatch({
      type: 'template/updateTemplate',
      targetID: this.props.template.id,
      content: {
        name: this.props.template.name,
        editorContent: jsonContent,
        schema: this.props.template.schema,
      },
    })
  };

  // handleEditorChange = editorState => {
  //   this.setState({ editorState });
  // };

  getCurrentHerfQuery = () => {
    let regex = /[^&=?]+=[^&]*/g;
    let parsedQuery = window.location.href.match(regex);

    let query = {}

    if (parsedQuery !== null) {
      parsedQuery.forEach(pairText => {
        let pair = pairText.split('=')
        query[pair[0]] = pair[1]
      })
    }

    return query
  }

  render() {
    const { dispatch, template } = this.props;
    return (
        <div className={styles.editorContainer}>
          <Row>
            <BraftEditor
              value={template.editorState}
              onChange={editorState => {
                dispatch({ type: 'template/updateEditorState', payload: editorState })
              }}
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
                data={JSON.stringify(template.schema)}
              onChange={schema => {
                dispatch({ type: 'template/updateSchema', payload: JSON.parse(schema) });
              }}
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
    );
  }
}

export default connect(({ template }) => ({ template }))(TemplateEditor)
