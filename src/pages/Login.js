import React, { useState, useEffect } from 'react';

import { useHistory, Link } from "react-router-dom";
import {Form, Checkbox, Input, Button, Layout, Row, Col, Alert} from 'antd';


import { FormattedMessage } from 'react-intl';

import {UserOutlined, LockOutlined} from '@ant-design/icons';


import { authenticationService } from '../services/authentication.service';

import axios from 'axios';
import styles from './Login.module.css';
const {Content} = Layout;






export default function Login(props) {

  
    const [type, setType] = useState('account');
    const [autoLogin, setAutoLogin] = useState(true)

    const [submitting, setSubmitting] = useState(false)


    const [errMesg, setErrMesg] = useState('');


    let history = useHistory();





    useEffect(()=>{

        if (localStorage.getItem('currentUser')) { 
            history.push('/');
        }
    }, [])

    const onTabChange = type => {
        setType(type);
    
    };

    const handleSubmit = (err, values) => {
      
        if (!err) {
          
            // request 
        }
    };

    const changeAutoLogin = e => {
        setAutoLogin(e.target.checked);
    };


    const renderMessage = content => (
        <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );


    const layout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        }
    }
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16
        }
    }
    const onFinish = values => {

        console.log(values)

        
        const {username, password} = values

        let email = ''
        if (username.indexOf('@') !== -1)  {
            email = username
            username = ''
        } 
    
    
    
        return axios.post('/api/rest-auth/login/', JSON.stringify({ email, username, password }), {
            headers: {
                'content-type':'application/json'
            }
        }).then( res => {
            console.log(res)


            const {token, user} = res.data;


            localStorage.setItem('currentUser', user.email);

            history.push('/');
        }).catch( err => {
            console.log(err)

            setErrMesg("err")
        })
    }

    const onFinishFailed = errInfo => {

    }



    return (





        <div className={styles.container}>
        <div className={styles.login}>
            <div className={styles.content}>

                
                <div className={styles.top}>

                    <div className={styles.header}>
                        <span className={styles.title}>Treehouse Data</span>
                    </div>

                    <div className={styles.desc}>Login</div>
                </div>

                
                <div className={styles.main}>
            {errMesg !== '' &&
              
              !submitting &&
              renderMessage(
                  <FormattedMessage id = 'app.login.message-invalid-verification-code' defaultMessage='Invalid email or password'/>
               
                )}
                <Form
            
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >


                        <Form.Item
                            name='username'
                            rules={[{ required: true, message: 'Please input your username/email!' }]}
                            
                        >
                             <Input  size='large' prefix={<UserOutlined />}
                             placeholder='Please input your username/email'/>
                        </Form.Item>
                        
                        <Form.Item
                            name='password'
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            
                        
                        >
                            <Input.Password  size='large' prefix={<LockOutlined />}
                            placeholder='Please input your password'
                            />
                        </Form.Item>


                        <div>
                            <Checkbox checked={autoLogin} onChange={changeAutoLogin}>
                            <FormattedMessage id="app.login.remember-me" defaultMessage='自动登录'/>
                            </Checkbox>
                            <a style={{ float: 'right' }} href="">
                            <FormattedMessage id="app.login.forgot-password" defaultMessage='忘记密码'/>
                            </a>
                        </div>
                        <Form.Item>
                            <Button loading={submitting} className={styles.btn} type='primary' htmlType='submit'>Login</Button>
                        </Form.Item>


                        <div className={styles.other}>


                            <Link className={styles.register} to="/register">
                                <FormattedMessage id="app.login.signup" defaultMessage="注册"/>
                            </Link>
                        </div>
                   
                </Form>
            </div>

            </div>

           
           
             
            

            
        </div>
        </div>
   
    )
}