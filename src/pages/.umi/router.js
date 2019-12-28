import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/gongchen/Practice/orange-client/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../../layouts/UserLayout'),
          LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
        exact: true,
      },
      {
        path: '/user/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/gongchen/Practice/orange-client/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () => import('../User/Login'),
              LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                .default,
            })
          : require('../User/Login').default,
        exact: true,
      },
      {
        path: '/user/register',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/gongchen/Practice/orange-client/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () => import('../User/Register'),
              LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                .default,
            })
          : require('../User/Register').default,
        exact: true,
      },
      {
        path: '/user/register-result',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/gongchen/Practice/orange-client/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () => import('../User/RegisterResult'),
              LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                .default,
            })
          : require('../User/RegisterResult').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/gongchen/Practice/orange-client/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    Routes: [require('../Authorized').default],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../Home'),
              LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                .default,
            })
          : require('../Home').default,
        exact: true,
      },
      {
        path: '/statistics',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/gongchen/Practice/orange-client/src/pages/Statistics/models/stat.js').then(
                  m => {
                    return { namespace: 'stat', ...m.default };
                  },
                ),
              ],
              component: () => import('../Statistics/Index'),
              LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                .default,
            })
          : require('../Statistics/Index').default,
        icon: 'bar-chart',
        name: 'statistics',
        exact: true,
      },
      {
        path: '/query',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/gongchen/Practice/orange-client/src/pages/List/models/query.js').then(
                  m => {
                    return { namespace: 'query', ...m.default };
                  },
                ),
                import('/Users/gongchen/Practice/orange-client/src/pages/List/models/rule.js').then(
                  m => {
                    return { namespace: 'rule', ...m.default };
                  },
                ),
              ],
              component: () => import('../List/List'),
              LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                .default,
            })
          : require('../List/List').default,
        icon: 'search',
        name: 'list',
        routes: [
          {
            path: '/query',
            redirect: '/query/adr',
            exact: true,
          },
          {
            path: '/query/adr',
            name: 'adr',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/gongchen/Practice/orange-client/src/pages/List/models/query.js').then(
                      m => {
                        return { namespace: 'query', ...m.default };
                      },
                    ),
                    import('/Users/gongchen/Practice/orange-client/src/pages/List/models/rule.js').then(
                      m => {
                        return { namespace: 'rule', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../List/List_Adr'),
                  LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                    .default,
                })
              : require('../List/List_Adr').default,
            hideInMenu: false,
            exact: true,
          },
          {
            path: '/query/house',
            name: 'house',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/gongchen/Practice/orange-client/src/pages/List/models/query.js').then(
                      m => {
                        return { namespace: 'query', ...m.default };
                      },
                    ),
                    import('/Users/gongchen/Practice/orange-client/src/pages/List/models/rule.js').then(
                      m => {
                        return { namespace: 'rule', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../List/List_Adr'),
                  LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                    .default,
                })
              : require('../List/List_Adr').default,
            hideInMenu: false,
            exact: true,
          },
          {
            path: '/query/vacancy',
            name: 'vacancy',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/gongchen/Practice/orange-client/src/pages/List/models/query.js').then(
                      m => {
                        return { namespace: 'query', ...m.default };
                      },
                    ),
                    import('/Users/gongchen/Practice/orange-client/src/pages/List/models/rule.js').then(
                      m => {
                        return { namespace: 'rule', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../List/List_Vacancy'),
                  LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                    .default,
                })
              : require('../List/List_Vacancy').default,
            hideInMenu: true,
            exact: true,
          },
          {
            path: '/query/info',
            name: 'info',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/gongchen/Practice/orange-client/src/pages/List/models/query.js').then(
                      m => {
                        return { namespace: 'query', ...m.default };
                      },
                    ),
                    import('/Users/gongchen/Practice/orange-client/src/pages/List/models/rule.js').then(
                      m => {
                        return { namespace: 'rule', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../List/List_Info'),
                  LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                    .default,
                })
              : require('../List/List_Info').default,
            hideInMenu: true,
            exact: true,
          },
          {
            path: '/query/zone',
            name: 'zone',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/gongchen/Practice/orange-client/src/pages/List/models/query.js').then(
                      m => {
                        return { namespace: 'query', ...m.default };
                      },
                    ),
                    import('/Users/gongchen/Practice/orange-client/src/pages/List/models/rule.js').then(
                      m => {
                        return { namespace: 'rule', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../List/List_Zone'),
                  LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                    .default,
                })
              : require('../List/List_Zone').default,
            hideInMenu: true,
            exact: true,
          },
          {
            path: '/query/brand',
            name: 'brand',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/gongchen/Practice/orange-client/src/pages/List/models/query.js').then(
                      m => {
                        return { namespace: 'query', ...m.default };
                      },
                    ),
                    import('/Users/gongchen/Practice/orange-client/src/pages/List/models/rule.js').then(
                      m => {
                        return { namespace: 'rule', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../List/List_Brand'),
                  LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                    .default,
                })
              : require('../List/List_Brand').default,
            hideInMenu: true,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/gongchen/Practice/orange-client/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/dashboard',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/gongchen/Practice/orange-client/src/pages/Dashboard/models/chart.js').then(
                  m => {
                    return { namespace: 'chart', ...m.default };
                  },
                ),
              ],
              component: () => import('../Dashboard/Index'),
              LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                .default,
            })
          : require('../Dashboard/Index').default,
        icon: 'dashboard',
        name: 'dashboard',
        exact: true,
      },
      {
        path: '/reports',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../Reports/Index'),
              LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                .default,
            })
          : require('../Reports/Index').default,
        icon: 'snippets',
        name: 'reports',
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/gongchen/Practice/orange-client/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    name: 'exception',
    icon: 'warning',
    path: '/exception',
    hideInMenu: true,
    routes: [
      {
        path: '/exception/403',
        name: 'not-permission',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/gongchen/Practice/orange-client/src/pages/Exception/models/error.js').then(
                  m => {
                    return { namespace: 'error', ...m.default };
                  },
                ),
              ],
              component: () => import('../Exception/403'),
              LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                .default,
            })
          : require('../Exception/403').default,
        exact: true,
      },
      {
        path: '/exception/404',
        name: 'not-find',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/gongchen/Practice/orange-client/src/pages/Exception/models/error.js').then(
                  m => {
                    return { namespace: 'error', ...m.default };
                  },
                ),
              ],
              component: () => import('../Exception/404'),
              LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                .default,
            })
          : require('../Exception/404').default,
        exact: true,
      },
      {
        path: '/exception/500',
        name: 'server-error',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/gongchen/Practice/orange-client/src/pages/Exception/models/error.js').then(
                  m => {
                    return { namespace: 'error', ...m.default };
                  },
                ),
              ],
              component: () => import('../Exception/500'),
              LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                .default,
            })
          : require('../Exception/500').default,
        exact: true,
      },
      {
        path: '/exception/trigger',
        name: 'trigger',
        hideInMenu: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/gongchen/Practice/orange-client/src/pages/Exception/models/error.js').then(
                  m => {
                    return { namespace: 'error', ...m.default };
                  },
                ),
              ],
              component: () => import('../Exception/TriggerException'),
              LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
                .default,
            })
          : require('../Exception/TriggerException').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/gongchen/Practice/orange-client/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../404'),
          LoadingComponent: require('/Users/gongchen/Practice/orange-client/src/components/PageLoading/index')
            .default,
        })
      : require('../404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('/Users/gongchen/Practice/orange-client/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

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
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
