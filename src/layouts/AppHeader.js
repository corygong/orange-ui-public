import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
const { Header } = Layout;



export default function AppHeader() {

    return (
        <Header style={{background:'#0f2741'}}>
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
        </Header>
    )

}