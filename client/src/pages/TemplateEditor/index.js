import React from 'react';
import { Button, Col, Drawer, message, Row, Timeline } from 'antd';
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

var format = require('date-format');
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
    schemaVisible: false,
    versionVisible: false,
  };

  componentDidMount() {
    // debugger
    const query = this.getCurrentHerfQuery()

    if (query.id !== undefined) {
      this.props.dispatch({
        type: 'template/getTemplate',
        targetID: query.id,
      })
      this.props.dispatch({
        type: 'template/getCommitList',
        targetID: query.id,
      })
      // console.log(this.props.template.commitList)
      // this.setState({
      //   currentCommitID: this.props.template.commitList[0].commitId,
      // })
    }
  }

  showDrawer = () => {
    this.setState({
      schemaVisible: true,
    });
  };

  onClose = () => {
    this.setState({
      schemaVisible: false,
    });
  };

  showVersionDrawer = () => {
    this.setState({
      versionVisible: true,
    });
  };

  onVersionClose = () => {
    this.setState({
      versionVisible: false,
    });
  };

  submitContent = () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容可直接调用editorState.toHTML()来获取HTML格式的内容
    // const htmlContent = this.state.editorState.toHTML();
    // const stringContent = this.state.editorState.toRAW();
    const jsonContent = this.props.template.editorState.toRAW(true);
    console.log(jsonContent)
    this.props.dispatch({
      type: 'template/updateTemplate',
      targetID: this.props.template.id,
      content: {
        name: this.props.template.name,
        editorContent: jsonContent,
        schema: this.props.template.schema,
      },
    })
    message.success('保存成功');
  };

  getCommitContent = e => {
    const commitID = e.target.name;
    this.props.dispatch({
      type: 'template/getCommit',
      targetID: this.props.template.id,
      commitID,
    })
    message.success(`成功切换到版本${commitID}`)
  }

  // handleEditorChange = editorState => {
  //   this.setState({ editorState });
  // };

  dateParser = text => {
    const date = format.parse(format.ISO8601_FORMAT, text)
    const formatDate = format("yyyy-MM-dd hh:mm:ss", date)
    console.log(formatDate)
    return formatDate
  }

  getCurrentHerfQuery = () => {
    const regex = /[^&=?]+=[^&]*/g;
    const parsedQuery = window.location.href.match(regex);

    const query = {}

    if (parsedQuery !== null) {
      parsedQuery.forEach(pairText => {
        const pair = pairText.split('=')
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
            title="Edition Version"
            placement="left"
            closable={false}
            onClose={this.onVersionClose}
            visible={this.state.versionVisible}
            width="50%"
          >
            <Timeline>
              {this.props.template.commitList.map(item => (
                <Timeline.Item key={item.commitId} color={Number(this.props.template.commitID) === Number(item.commitId) ? 'green' : 'blue'}>
                  <a name={item.commitId} onClick={this.getCommitContent}>
                    {`Version: ${item.commitId} Time: ${this.dateParse(item.commitDate)}`}
                  </a>
                </Timeline.Item>
              ))}
            </Timeline>
          </Drawer>
          <Drawer
            title="Schema Editor"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.schemaVisible}
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
          <Col span={2}>
            <div className={styles.buttonContainer}>
              <Button type="primary" block onClick={this.showVersionDrawer}>
                Version
              </Button>
            </div>
          </Col>
          <Col span={18}></Col>
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
