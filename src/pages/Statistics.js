import React, { useState } from 'react';
import {Layout ,Breadcrumb} from 'antd'
const {Content} = Layout;



export default function Statistics(props) {

    const stat_name = props.match.params.stat_name;


    return (

        <Content style={{ padding:'0 50px' }}>
            <div style={{background:'#0f2741', padding: '24px', minHeight:'280px'}}>Content</div>
        </Content>
    )
}
