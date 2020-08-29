import React, { useState } from 'react';


import {Form, Checkbox, Input, Button, Layout} from 'antd';


import styles from './Login.module.less';
const {Content} = Layout;
export default function Login(props) {




    const layout = {
        // labelCol: {
        //     span: 8
        // },
        // wrapperCol: {
        //     span: 16
        // }
    }
    const tailLayout = {
        // wrapperCol: {
        //     offset: 8,
        //     span: 16
        // }
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
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
            </div>
   
    )
}