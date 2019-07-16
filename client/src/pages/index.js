import React from 'react';
import Link from 'umi/Link';
import BasicLayout from '@/layouts/BasicLayout';
import styles from './index.css';

class App extends React.PureComponent {
  render() {
    return (
      <BasicLayout>
        <div className={styles.welcome}>
          <div>Welcome</div>
          <div>
            <Link to="/TemplateList">TemplateList</Link>
          </div>
          <div>
            <Link to="/TemplateContent">TemplateContent</Link>
          </div>
        </div>
      </BasicLayout>
    );
  }
}

export default App;
