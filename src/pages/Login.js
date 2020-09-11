import React, { useState, useEffect } from 'react';


import {Form, Checkbox, Input, Button, Layout, Row, Col, Alert} from 'antd';


import { FormattedMessage } from 'react-intl';

import {UserOutlined, LockOutlined} from '@ant-design/icons';


import { authenticationService } from '../services/authentication.service';

import styles from './Login.module.css';
const {Content} = Layout;






export default function Login(props) {

  
    const [type, setType] = useState('account');
    const [autoLogin, setAutoLogin] = useState(true)

    const [submitting, setSubmitting] = useState(false)



    // useEffect(()=>{

    //     if (authenticationService.currentUserValue) { 
    //         this.props.history.push('/');
    //     }
    // }, [authenticationService.currentUserValue])

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

    }

    const onFinishFailed = errInfo => {

    }



    return (






        <div className={styles.login}>
            <div className={styles.top}>
                <div className={styles.header}>Treehouse Data</div>

            </div>
            <div className={styles.main}>
                <Form
            
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >


                        <Form.Item>
                             <Input  size='large' prefix={<UserOutlined />}/>
                        </Form.Item>
                        
                        <Form.Item>
                            <Input.Password  size='large' prefix={<LockOutlined />}/>
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
                            <Button className={styles.btn} type='primary' htmlType='submit'>Login</Button>
                        </Form.Item>
                   
                </Form>
            </div>
             
            

            
        </div>
   
    )
}