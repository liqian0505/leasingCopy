import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from '/Users/perish/Projects/leasing/client/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    "path": "/",
    "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../../layouts/BasicLayout'),
      LoadingComponent: require('/Users/perish/Projects/leasing/client/src/components/PageLoading/index').default,
    })
    : require('../../layouts/BasicLayout').default,
    "routes": [
      {
        "path": "/",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__index" */'../index'),
      LoadingComponent: require('/Users/perish/Projects/leasing/client/src/components/PageLoading/index').default,
    })
    : require('../index').default,
        "exact": true
      },
      {
        "path": "/ContractEditor",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__ContractEditor" */'../ContractEditor'),
      LoadingComponent: require('/Users/perish/Projects/leasing/client/src/components/PageLoading/index').default,
    })
    : require('../ContractEditor').default,
        "exact": true
      },
      {
        "path": "/ContractList",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__ContractList" */'../ContractList'),
      LoadingComponent: require('/Users/perish/Projects/leasing/client/src/components/PageLoading/index').default,
    })
    : require('../ContractList').default,
        "exact": true
      },
      {
        "path": "/TemplateEditor",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__TemplateEditor" */'../TemplateEditor'),
      LoadingComponent: require('/Users/perish/Projects/leasing/client/src/components/PageLoading/index').default,
    })
    : require('../TemplateEditor').default,
        "exact": true
      },
      {
        "path": "/TemplateList",
        "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__TemplateList" */'../TemplateList'),
      LoadingComponent: require('/Users/perish/Projects/leasing/client/src/components/PageLoading/index').default,
    })
    : require('../TemplateList').default,
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/perish/Projects/leasing/client/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": __IS_BROWSER
    ? _dvaDynamic({
      
      component: () => import(/* webpackChunkName: "p__404" */'../404'),
      LoadingComponent: require('/Users/perish/Projects/leasing/client/src/components/PageLoading/index').default,
    })
    : require('../404').default,
    "exact": true
  },
  {
    "component": () => React.createElement(require('/Users/perish/Projects/leasing/client/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
history.listen(routeChangeHandler);
routeChangeHandler(history.location);

export { routes };

export default function RouterWrapper(props = {}) {
  return (
    <RendererWrapper0>
      <Router history={history}>{renderRoutes(routes, props)}</Router>
    </RendererWrapper0>
  );
}

import RendererWrapper0 from '/Users/perish/Projects/leasing/client/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/perish/Projects/leasing/client/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    routes: [
        path: '/',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__index" */ '../index'),
              LoadingComponent: require('/Users/perish/Projects/leasing/client/src/components/PageLoading/index')
                .default,
            })
          : require('../index').default,
        exact: true,
        path: '/ContractEditor',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__ContractEditor" */ '../ContractEditor'),
              LoadingComponent: require('/Users/perish/Projects/leasing/client/src/components/PageLoading/index')
                .default,
            })
          : require('../ContractEditor').default,
        exact: true,
        path: '/ContractList',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__ContractList" */ '../ContractList'),
              LoadingComponent: require('/Users/perish/Projects/leasing/client/src/components/PageLoading/index')
                .default,
            })
          : require('../ContractList').default,
        exact: true,
        path: '/TemplateEditor',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__TemplateEditor" */ '../TemplateEditor'),
              LoadingComponent: require('/Users/perish/Projects/leasing/client/src/components/PageLoading/index')
                .default,
            })
          : require('../TemplateEditor').default,
        exact: true,
        path: '/TemplateList',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__TemplateList" */ '../TemplateList'),
              LoadingComponent: require('/Users/perish/Projects/leasing/client/src/components/PageLoading/index')
                .default,
            })
          : require('../TemplateList').default,
        exact: true,
        component: () =>
          React.createElement(
            require('/Users/perish/Projects/leasing/client/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ '../404'),
          LoadingComponent: require('/Users/perish/Projects/leasing/client/src/components/PageLoading/index')
            .default,
        })
      : require('../404').default,
    exact: true,
    component: () =>
      React.createElement(
        require('/Users/perish/Projects/leasing/client/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },