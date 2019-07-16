import React from 'react';
import Link from 'umi/link';
import BasicLayout from '@/layouts/BasicLayout';
import styles from './index.css';

class App extends React.PureComponent {
  render() {
    return (
      <BasicLayout>
        <div className={styles.welcome}>
          <div>
            <Link to="/TemplateList">TemplateList</Link>
          </div>
          <div>
            <Link to="/TemplateContent">TemplateContent</Link>
          </div>
          <div>
            <Link to="/ContractList">ContractList</Link>
          </div>
          <div>
            <Link to="/ContractContent">ContractContent</Link>
          </div>
        </div>
      </BasicLayout>
    );
  }
}

export default App;
