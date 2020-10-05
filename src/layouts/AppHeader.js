import React, { useState } from 'react';
import { Layout, Menu ,Avatar, Dropdown} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { UserOutlined, TranslationOutlined } from '@ant-design/icons';

import styles  from './AppHeader.module.css';


import SelectLang from '../components/SelectLang';
const { Header } = Layout;



export default function AppHeader() {


    let history = useHistory();

    const logout = () => {


        localStorage.removeItem('currentUser');
        history.push('/login');
    }

    const menu = (
        <Menu>
 
          <Menu.Item>
            <a onClick={logout}>
              Logout
            </a>
          </Menu.Item>
        </Menu>
      )


    return (
        <Header style={{background:'#0f2741', display:"flex"}}>
            <div style={{float:'left' }}>
                <Link to='/'>
                <h2 style={{color:'#fff'}}>
                    TreehouseData
                </h2>
                </Link>
            </div>
            <Menu style={{background:'#0f2741'}} mode='horizontal'>

                <Menu.Item key='1'>
    
                    <Link style={{color:'#fff'}} to ='/statistics'>Data & Charts</Link>
                </Menu.Item>
                <Menu.Item key='2'>
                    <Link style={{color:'#fff'}} to ='/reports'>Reports</Link>
                </Menu.Item>
                <Menu.Item key='3'>
                    <Link style={{color:'#fff'}} to ='/Tables'>Tables</Link>
                </Menu.Item>
                <Menu.Item key='4'>
                    <Link style={{color:'#fff'}} to ='/dashboard'>Dashboard</Link>
                </Menu.Item>
               

            </Menu>

            <div style={{float:"right",  marginLeft:'auto'}}>

                <Dropdown overlay={menu}>
                    <UserOutlined className={styles.iconstyle} />

                </Dropdown>


                <SelectLang/>

                
            </div>

            
           
            
        </Header>
    )

}