import React , {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';


import { BrowserRouter, Router, Route, useHistory } from 'react-router-dom';

import { PrivateRoute } from './components/PrivateRoute';
import AppHeader from './layouts/AppHeader';
import AppFooter from './layouts/AppFooter';



import { IntlProvider } from 'react-intl';


import Home from './pages/Home';
import Statistics from './pages/Statistics';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';

import NotFound from './components/NotFound';
import { render } from '@testing-library/react';









const zh = import('./locales/zh-CN.json');








export default function App(props) {







  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser'));

  let history = useHistory();


  useEffect(() => {
    if (localStorage.getItem("currentUser") === null) {
        history.push('/login');
    }
  
  },[])
  
  



  console.log(currentUser)

  // authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  // return <PrimaryLayout/>


    return (

      <IntlProvider locale='en' defaultLocale="en" messages={zh}>
        <BrowserRouter history={history}>
          <div>
  
            {
              currentUser && <AppHeader/> }
      
          
            <div>
                    {/* <AppHeader/> */}
                      <PrivateRoute exact path={'/'} component={Home} />
                      {/* <Route path={'/statistics'} component={ NotFound}/> */}
                      <PrivateRoute path={'/statistics/:stat_name'} component={Statistics} />
                      <PrivateRoute exact path={'/dashboard'} component={Dashboard} />
                      <PrivateRoute exact path={"/search"} component={Search}/>
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/register" component={Register} />
                    <AppFooter/>
            </div>
          </div>
        </BrowserRouter>
      </IntlProvider>
    )
  

}


