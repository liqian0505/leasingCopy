import React from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import styles from './index.css';
import Link from 'umi/Link';

class App extends React.PureComponent {
  render() {
    return (
      <BasicLayout>
        <div className={styles.welcome}>
          <Link to="/TemplateList">Welcome</Link>
        </div>
      </BasicLayout>
    );
  }
}

export default App;
