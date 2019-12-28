export default [
  // user
  {
    path: "/user",
    component: "../layouts/UserLayout",
    routes: [
      { path: "/user", redirect: "/user/login" },
      { path: "/user/login", component: "./User/Login" },
      { path: "/user/register", component: "./User/Register" },
      { path: "/user/register-result", component: "./User/RegisterResult" }
    ]
  },
  // Home
  {
    path: "/",
    component: "../layouts/BasicLayout",
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [

      { path: "/", component: "./Home" },
        {
        path: '/statistics',
        component: './Statistics/Index',
        icon: 'bar-chart',
        name: 'statistics'
      },

      {
        path: "/query",
        component: "./List/List",
        icon: "search",
        name: "list",
        routes: [
          { path: "/query", redirect: '/query/adr'},
          { path: "/query/adr", name: "adr", component: "./List/List_Adr", hideInMenu: false},
          { path: "/query/house", name: "house", component:"./List/List_Adr", hideInMenu: false},
          { path: "/query/vacancy", name: "vacancy", component: "./List/List_Vacancy", hideInMenu: true },
          { path: "/query/info", name: "info", component: "./List/List_Info", hideInMenu: true },
          { path: "/query/zone", name: "zone", component: "./List/List_Zone", hideInMenu: true },
          { path: "/query/brand", name: "brand", component: "./List/List_Brand", hideInMenu: true },
        ],
      },
      {
        path: '/dashboard',
        component: './Dashboard/Index',
        icon: 'dashboard',
        name:'dashboard'

      },


      {
        path: '/reports',
        component: './Reports/Index',
        icon: 'snippets',
        name: 'reports'
      }
    ]
  },
  // app


  {
    name: "exception",
    icon: "warning",
    path: "/exception",
    hideInMenu: true,
    routes: [
      // exception
      {
        path: "/exception/403",
        name: "not-permission",
        component: "./Exception/403"
      },
      {
        path: "/exception/404",
        name: "not-find",
        component: "./Exception/404"
      },
      {
        path: "/exception/500",
        name: "server-error",
        component: "./Exception/500"
      },
      {
        path: "/exception/trigger",
        name: "trigger",
        hideInMenu: true,
        component: "./Exception/TriggerException"
      }
    ]
  },
  {
    component: "404"
  }
];
