import React , {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';


import { BrowserRouter, Router, Route } from 'react-router-dom';

import { PrivateRoute } from './components/PrivateRoute';
import AppHeader from './layouts/AppHeader';
import AppFooter from './layouts/AppFooter';



import { IntlProvider } from 'react-intl';


import Home from './pages/Home';
import Statistics from './pages/Statistics';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Login from './pages/Login';

import NotFound from './components/NotFound';


import { authenticationService } from './services/authentication.service';






const zh = import('./locales/zh-CN.json');

const PrimaryLayout = props => (
    <div style={{background:'#0f2741'}}> 

        <IntlProvider locale='en' defaultLocale="en" messages={zh}
>
          
            <AppHeader/>
              <PrivateRoute exact path={'/'} component={Home} />
              {/* <Route path={'/statistics'} component={ NotFound}/> */}
              <PrivateRoute path={'/statistics/:stat_name'} component={Statistics} />
              <PrivateRoute exact path={'/dashboard'} component={Dashboard} />
              <PrivateRoute exact path="/search" component={Search}/>
              {/* <Route exact path="/login" component={Login} /> */}
            <AppFooter/>
    
        </IntlProvider>
       
        
    </div>
)



const UserLayout = props => (
  <div style={{background:'#0f2741'}}> 
          <IntlProvider locale='en' defaultLocale="en" messages={zh}
>

    <Route exact path="/login" component={Login} />

    {/* <AppFooter/> */}
    </IntlProvider>
  </div>
)


function App() {


  const [currentUser, setCurrentUser] = useState(null)




  useEffect(() => {

    setCurrentUser(authenticationService.currentUser)
  }, [authenticationService.currentUser]);

  // authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  // return <PrimaryLayout/>

  return (

    <BrowserRouter>
    <div>

      {currentUser && <PrimaryLayout/>}
      <UserLayout/>
    </div>
    </BrowserRouter>
  )
}

export default App;
