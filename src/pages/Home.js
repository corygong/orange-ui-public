import React, { useState } from 'react';
import {Layout ,Breadcrumb, Input, Button, Form} from 'antd'


import './Home.css';


import { useHistory } from 'react-router-dom';

const {Content} = Layout;

const { Search } = Input;





export default function Home(props) {



    const [form] = Form.useForm();
    const {formLayout, setFormLayout} = useState('Inline')


    const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

    const buttonItemLayout =
        formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
            }
        : null;



    let history = useHistory();
    const onSearch = (value) => {
        console.log(value);
        history.push('/search?q=' + value);

    }
    return (

        <Content style={{ padding:'0 50px' }}>

            
            <div style={{background:'#0f2741', padding: '24px', minHeight:'600px'}}>

                <h1 style={{textAlign:'center', color:'#fff', fontSize:'62px'}}>Data Exploration Platform</h1>
                <h2 style={{textAlign:'center', color:'#fff', fontSize:'24px'}}>Suan.....</h2>
         

          
                {/* <Form 
             
                    form={form}
               
                >
                    <Form.Item>
                        <Input className='home-search-input' placeholder="Search..."/>
                    </Form.Item>
                    <Form.Item >
                        <Button className='home-search-btn' type='primary'>Search</Button>
                    </Form.Item>
                </Form> */}

            <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={value => onSearch(value)}
                />
                
            </div>
        </Content>
    )
}

