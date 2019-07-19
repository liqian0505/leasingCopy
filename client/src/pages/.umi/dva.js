import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'contract', ...(require('/Users/ics/Documents/repos/leasing/client/src/models/contract.js').default) });
app.model({ namespace: 'contractList', ...(require('/Users/ics/Documents/repos/leasing/client/src/models/contractList.js').default) });
app.model({ namespace: 'global', ...(require('/Users/ics/Documents/repos/leasing/client/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('/Users/ics/Documents/repos/leasing/client/src/models/login.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/ics/Documents/repos/leasing/client/src/models/setting.js').default) });
app.model({ namespace: 'template', ...(require('/Users/ics/Documents/repos/leasing/client/src/models/template.js').default) });
app.model({ namespace: 'templateList', ...(require('/Users/ics/Documents/repos/leasing/client/src/models/templateList.js').default) });
app.model({ namespace: 'user', ...(require('/Users/ics/Documents/repos/leasing/client/src/models/user.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
