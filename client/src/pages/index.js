import React from 'react';
import Link from 'umi/link';
// import BasicLayout from '@/layouts/BasicLayout';
import styles from './index.css';

class App extends React.PureComponent {
  render() {
    return (
        <div className={styles.welcome}>
          <div>
            <Link to="/TemplateList">TemplateList</Link>
          </div>
          <div>
            <Link to="/TemplateEditor">TemplateEditor</Link>
          </div>
          <div>
            <Link to="/ContractList">ContractList</Link>
          </div>
          <div>
            <Link to="/ContractEditor">ContractEditor</Link>
          </div>
        </div>
    );
  }
}

export default App;
