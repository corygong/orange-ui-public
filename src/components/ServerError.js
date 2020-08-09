import React, { useState } from 'react';
import {Layout ,Breadcrumb, Result, Button} from 'antd'

import {Link } from 'react-router-dom';
const {Content} = Layout;



export default function ServerError(props) {


    return (

        <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
                extra={<Button type="primary"><Link to ="/">Back Home</Link></Button>}
            />
    )
}
