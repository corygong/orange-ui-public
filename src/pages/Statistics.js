import React, { useState, Suspense} from 'react';


import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';


import intl from 'react-intl-universal';

import {Layout ,
    Breadcrumb, 
    Tabs, 
    Collapse, 
    Row, 
    Col,
    Result,
    Button
} from 'antd';

import CustomBarCharts from '../components/CustomBarCharts';
import { get, post } from '../utils/request';

import moment from 'moment';
window.moment = moment
NoDataToDisplay(Highcharts)

const {Content} = Layout;
const {Panel} = Collapse;

export default function Statistics(props) {

    const stat_name = props.match.params.stat_name;


    const [chart_desc, setChartDesc] = useState("");
    const [chart_title, setChartTitle] = useState("");

    const [chart_title_x, setChartTitleX] = useState("");
    const [chart_title_y, setChartTitleY] = useState("");
    const [chart_data, setChartData] = useState([]);

    const [data_source, setDataSource] = useState("");
    const [data_source_link, setDataSourceLink] = useState("");
    const [loading, setLoading] = useState(true);



    if (stat_name == "" || stat_name == null) {
        return (

            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
        )
    }




    return (

        <Content style={{ padding:'0 50px' }}>
            <div style={{background:'#0f2741', padding: '24px', minHeight:'280px'}}>

            <Row gutter={24}>
                        <Col span={16} >
    
                            {/* {chartComponent} */}
    
                            {/* <Suspense fallback={<PageLoading />}> */}
                                <CustomBarCharts loading={loading} title= {chart_title} data={chart_data} xAxis={chart_title_x} yAxis={chart_title_y} />
                            {/* </Suspense> */}
    
                        </Col>
                        <Col span={8} >
                            <Row gutter={16} type="flex">
                                <Collapse defaultActiveKey={['1', '2', '3', '4']}>
                                    <Panel key="1" header={intl.get("app.statistics.download")}>
                                        <Row gutter={16} type="flex">
                                            <Col span={8}><Button type="primary">PNG</Button></Col>
                                            <Col span={8}><Button type="primary">PDF</Button></Col>
                                            <Col span={8}><Button type="primary">XLS</Button></Col>
                                        </Row>
    
                                    </Panel>
    
                                    <Panel key="2" header={intl.get("app.statistics.description")}>
    
                                        {chart_desc}
                                    </Panel>
    
                                     <Panel key="3" header={intl.get("app.statistics.source")}>
                                        {data_source}
                                    </Panel>
    
                                    <Panel key="4" header={intl.get("app.statistics.source-link")}>
                                        {data_source_link}
                                    </Panel>
                                </Collapse>
                            </Row>
                        </Col>
    
                    </Row>
            </div>
        </Content>
    )
}
