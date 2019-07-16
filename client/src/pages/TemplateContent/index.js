import React from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
import { Card } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import styles from './index.css';

export default class TemplateEditor extends React.Component {
  state = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(null),
  };

  componentDidMount() {}

  submitContent = () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML();
    const stringContent = this.state.editorState.toRAW();
    const jsonContent = this.state.editorState.toRAW(true);
    console.log(htmlContent, stringContent, jsonContent);
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const { editorState } = this.state;
    return (
      <BasicLayout>
        <Card className={styles.editorContainer}>
          <BraftEditor
            value={editorState}
            onChange={this.handleEditorChange}
            onSave={this.submitContent}
          />
        </Card>
      </BasicLayout>
    );
  }
}
