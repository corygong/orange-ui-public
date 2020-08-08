import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

import { BrowserRouter, Router, Route } from 'react-router-dom';
import AppHeader from './layouts/AppHeader';
import AppFooter from './layouts/AppFooter';

import {Layout} from 'antd';


import Home from './pages/Home';
import Statistics from './pages/Statistics';
import Dashboard from './pages/Dashboard';



const PrimaryLayout = props => (
    <div style={{background:'#0f2741'}}> 

        
        <BrowserRouter>
          <AppHeader/>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/statistics'} component={Statistics} />
            <Route exact path={'/dashboard'} component={Dashboard} />
          <AppFooter/>
        </BrowserRouter>
       
        
    </div>


)
function App() {
  return <PrimaryLayout/>
}

export default App;
