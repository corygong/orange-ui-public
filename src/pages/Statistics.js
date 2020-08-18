import React, { useState, Suspense, useEffect} from 'react';

import axios from 'axios';
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import { useLocation } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';

import {Layout ,
    Breadcrumb, 
    Tabs, 
    Collapse, 
    Row, 
    Col,
    Result,
    Button,
    message
} from 'antd';

import CustomBarCharts from '../components/CustomBarCharts';
import { get, post } from '../utils/request';

import moment from 'moment';
window.moment = moment
NoDataToDisplay(Highcharts)

const {Content} = Layout;
const {Panel} = Collapse;

export default function Statistics(props) {




    const [chart_desc, setChartDesc] = useState("");
    const [chart_title, setChartTitle] = useState("");

    const [chart_title_x, setChartTitleX] = useState("");
    const [chart_title_y, setChartTitleY] = useState("");
    const [chart_data, setChartData] = useState([]);

    const [data_source, setDataSource] = useState("");
    const [data_source_link, setDataSourceLink] = useState("");
    const [loading, setLoading] = useState(true);







    // if (stat_name == "") {
    //     return (
    //         <Result
    //             status="404"
    //             title="404"
    //             subTitle="Sorry, the page you visited does not exist."
    //             extra={<Button type="primary">Back Home</Button>}
    //         />
    //     )
    // }
    const {match: {params}} = props;

    const {stat_name} = params;


    useEffect(() => {
      
        console.log(stat_name)

        axios.get('/api/statistics/info/' + stat_name).then( res => {
            setLoading(false);
            // console.log(res)
            const {data} = res;
            setChartData(data.chart_data);
            setChartDesc(data.chart_desc);
            setChartTitle(data.chart_title);
            setChartTitleX(data.chart_title_x);
            setChartTitleY(data.chart_title_y);
            setDataSource(data.data_source);
            setDataSourceLink(data.data_source_link);


        }).catch( err => {
            message.error("Server Error!")
        })
     
    }, [stat_name]);

    



    // if (stat_name == "" || stat_name == null) {
    //     return (

    //         <Result
    //             status="404"
    //             title="404"
    //             subTitle="Sorry, the page you visited does not exist."
    //             extra={<Button type="primary">Back Home</Button>}
    //         />
    //     )
    // }




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
                                    <Panel key="1" header={<FormattedMessage id="app.statistics.download" />}>
                                        <Row gutter={16} type="flex">
                                            <Col span={8}><Button type="primary">PNG</Button></Col>
                                            <Col span={8}><Button type="primary">PDF</Button></Col>
                                            <Col span={8}><Button type="primary">XLS</Button></Col>
                                        </Row>
    
                                    </Panel>
    
                                    <Panel key="2" header={<FormattedMessage id="app.statistics.description" />}>
    
                                        {chart_desc}
                                    </Panel>
    
                                     <Panel key="3" header={<FormattedMessage id="app.statistics.source" />}>
                                        {data_source}
                                    </Panel>
    
                                    <Panel key="4" header={<FormattedMessage id="app.statistics.source-link" />}>
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
