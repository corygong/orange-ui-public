import React, { useState } from 'react';


import {Form, Checkbox, Input, Button, Layout, Row, Col} from 'antd';


import {UserOutlined, LockOutlined} from '@ant-design/icons';

import styles from './Login.module.css';
const {Content} = Layout;
export default function Register(props) {




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

            <Form 
            {...layout}
            initialValues={{
                rember: true
            }}
            onFinish={onFinish}>
                <Form.Item>


                    <Row gutter={8}>
                        <Col span={16}>
                            <Input/>
                        </Col>
                        {/* <Col span={8}>
                        <Button
                            disabled={count}
                            className={styles.getCaptcha}
                            size="large"
                            onClick={this.onGetCaptcha}
                        >
                            {count ? `${count} ${getCaptchaSecondText}` : getCaptchaButtonText}
                        </Button>
                        </Col> */}
                    </Row>
                </Form.Item>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item {...tailLayout}>

                    <Button size="large" className={styles.submit} type="primary" htmlType="submit" >Submit</Button>
                    
                </Form.Item>
            </Form>
            </div>
   
    )
}