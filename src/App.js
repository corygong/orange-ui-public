import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

import { BrowserRouter, Router, Route } from 'react-router-dom';
import AppHeader from './layouts/AppHeader';
import AppFooter from './layouts/AppFooter';



import { IntlProvider } from 'react-intl';


import Home from './pages/Home';
import Statistics from './pages/Statistics';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';

import NotFound from './components/NotFound';






const zh = import('./locales/zh-CN.json');

const PrimaryLayout = props => (
    <div style={{background:'#0f2741'}}> 

        <IntlProvider locale='en' defaultLocale="en" messages={zh}
>
          <BrowserRouter>
            <AppHeader/>
              <Route exact path={'/'} component={Home} />
              {/* <Route path={'/statistics'} component={ NotFound}/> */}
              <Route path={'/statistics/:stat_name'} component={Statistics} />
              <Route exact path={'/dashboard'} component={Dashboard} />
              <Route exact path="/search" component={Search}/>
            <AppFooter/>
          </BrowserRouter>
        </IntlProvider>
       
        
    </div>
)
function App() {
  return <PrimaryLayout/>
}

export default App;
