import React, { useState } from 'react';

import { useHistory, Link } from "react-router-dom";
import {Form, Checkbox, Input, Button, Layout, Row, Col, Alert, message} from 'antd';


import { FormattedMessage } from 'react-intl';
import {UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';

import axios from 'axios';
import styles from './Login.module.css';
const {Content} = Layout;
export default function Register(props) {

    const [type, setType] = useState('account');
    const [autoLogin, setAutoLogin] = useState(true)

    const [submitting, setSubmitting] = useState(false)


    const [errMesg, setErrMesg] = useState('');


    let history = useHistory();


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

        
        const {email, password1, password2} = values


        const username = email;

      
    
    
    
        return axios.post('/api/rest-auth/registration/', JSON.stringify({ email, username, password1, password2 }), {
            headers: {
                'content-type':'application/json'
            }
        }).then( res => {
            console.log(res)


            const {token, user} = res.data;


            // localStorage.setItem('currentUser', user.email);

            message.success("Register succeed!")

            history.push('/login');
        }).catch( err => {
            console.log(err.response)

            let errMesg = ""

            if (err.response.hasOwnProperty('data')) {
                let data = err.response.data;

                // if (data.hasOwnProperty('username')) {
                //     errMesg += "The username has already registered, please try another one"
                // }
                if (data.hasOwnProperty('email')) {

                    if(errMesg == "") {
                        errMesg += "The email is not correct or has already registered"
                    }else {
                        errMesg += " and The email is not correct or has already registered"
                    }
                    
                }
                if (data.hasOwnProperty('password1')) {
                    if(errMesg == "") {
                        errMesg += "The password is too simple or less than 8 words"
                    } else {
                        errMesg += " and The password is too simple or less than 8 words"
                    }
                    
                }

                if (data.hasOwnProperty('non_field_errors')) {
                    if(errMesg == "") {
                        errMesg += "The two password is not match"
                    } else {
                        errMesg += " and The two password is not match"
                    }
                    
                }
            }

            setErrMesg(errMesg)
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

                    <div className={styles.desc}>Register</div>
                </div>

                
                <div className={styles.main}>
            {errMesg !== '' &&
              
              !submitting &&
              renderMessage(
                  errMesg
               
                )}
                <Form
            
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >


                        {/* <Form.Item
                            name='username'
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            
                        >
                             <Input  size='large' prefix={<UserOutlined />}
                             placeholder='Please input your username'/>
                        </Form.Item> */}

                        <Form.Item
                            name='email'
                            rules={[{ required: true, message: 'Please input your email!' }]}
                            
                        >
                             <Input  size='large' prefix={<MailOutlined />}
                             placeholder='Please input your email'/>
                        </Form.Item>
                        
                        <Form.Item
                            name='password1'
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            
                        
                        >
                            <Input.Password  size='large' prefix={<LockOutlined />}
                            placeholder='Please input your password'
                            />
                        </Form.Item>
                        <Form.Item
                            name='password2'
                            rules={[{ required: true, message: 'Please confirm your password!' }]}
                            
                        
                        >
                            <Input.Password  size='large' prefix={<LockOutlined />}
                            placeholder='Please confirm your password'
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                size="large"
                                loading={submitting}
                                className={styles.btn}
                                type="primary"
                                htmlType="submit"
                            >
                                <FormattedMessage id="app.register.register" defaultMessage='Register'/>
                            </Button>
                            <Link className={styles.register} to="/Login">
                                <FormattedMessage id="app.register.sign-in" defaultMessage="Login"/>
                            </Link>
                        </Form.Item>
                   
                </Form>
            </div>

            </div>

           
           
             
            

            
        </div>
        </div>
   
    )
}