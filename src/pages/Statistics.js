import React, { useState, Suspense, useEffect, useRef} from 'react';

import axios from 'axios';
import Highcharts from "highcharts";
import { CSVLink, CSVDownload } from "react-csv";
import HighchartsReact from 'highcharts-react-official'
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import HC_exporting from 'highcharts/modules/exporting';


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
import CustomLineCharts from '../components/CustomLineCharts';
import { get, post } from '../utils/request';


import moment from 'moment';



window.moment = moment
NoDataToDisplay(Highcharts)

const {Content} = Layout;
const {Panel} = Collapse;


HC_exporting(Highcharts);
export default function Statistics(props) {




    const [chart_desc, setChartDesc] = useState("");
    const [chart_title, setChartTitle] = useState("");

    const [chart_title_x, setChartTitleX] = useState("");
    const [chart_title_y, setChartTitleY] = useState("");
    const [chart_data, setChartData] = useState([]);

    const [data_source, setDataSource] = useState("");
    const [data_source_link, setDataSourceLink] = useState("");
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState([]);


    const [legendTitleZ, setLegendTitleZ] = useState(null);


    const {match: {params}} = props;

    const {stat_name} = params;


    useEffect(() => {
      
        console.log(stat_name)

        axios.get('/api/statistics/info/' + stat_name,{ headers:{
            'Authorization': 'jwt ' +  localStorage.getItem('currentJWT'),
            'Content-Type': 'application/json'
        }}).then( res => {
            setLoading(false);

            const {data} = res;

            console.log(data)

            const {code} = data;


            if (code == 200) {
                setChartData(data.chart_data);
                setChartDesc(data.chart_desc);
                setChartTitle(data.chart_title);
                setChartTitleX(data.chart_title_x);
                setChartTitleY(data.chart_title_y);
                setDataSource(data.data_source);
                setDataSourceLink(data.data_source_link);
                setCategories(data.categories);


                setLegendTitleZ(data.legend_title_z);



                // console.log(data.legend_title_z == null)

                // if(data.legend_title_z == null) {
                //     setChartTemplate(<CustomBarCharts loading={loading} title= {chart_title} data={chart_data} xAxis={chart_title_x} yAxis={chart_title_y} />);
                // }else {
                //     setChartTemplate(<CustomLineCharts loading={loading} title= {chart_title} data={chart_data} xAxis={chart_title_x} yAxis={chart_title_y} />);
                // }
            } else if (code == 404) {

                //TODO: show 404 page
                return (
                    <Result
                                status="404"
                                title="404"
                                subTitle="Sorry, the page you visited does not exist."
                                extra={<Button type="primary">Back Home</Button>}
                            />
                )
            }

            



        }).catch( err => {
            message.error("Server Error!")
        })
    }, []);

    


    const chartRef = useRef()
    const exportPNG = () => {
       
        const chart = chartRef.current;
        chartRef.current && chartRef.current.exportChart({type: "image/png", filename:chart_title});
        chartRef.current = chart;
        // chartRef.current.exportChart({type: "application/png"});


    }
    const exportPDF = () => {
       
        const chart = chartRef.current;
        chartRef.current && chartRef.current.exportChart({type: "application/pdf", filename: chart_title});
        chartRef.current = chart;

    }



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




    // console.log(categories, chart_data)

    return (

        <Content style={{ padding:'0 50px' }}>
            <div style={{background:'#0f2741', padding: '24px', minHeight:'280px'}}>

            <Row gutter={24}>
                        <Col span={16} >
    
                                { legendTitleZ ===null ?
                                <CustomBarCharts chartRef={chartRef} loading={loading} title= {chart_title} data={chart_data} xAxis={chart_title_x} yAxis={chart_title_y} />
                                : 
                                <CustomLineCharts chartRef={chartRef} categories={categories} loading={loading} title= {chart_title} data={chart_data} xAxis={chart_title_x} yAxis={chart_title_y} />}
    
                                
                                {/* <CustomLineCharts categories={categories} loading={loading} title= {chart_title} data={chart_data} xAxis={chart_title_x} yAxis={chart_title_y} /> */}
    
                            {/* {chartTemplate} */}
                        </Col>
                        <Col span={8} >
                            <Row gutter={16} type="flex">
                                <Collapse defaultActiveKey={['1', '2', '3', '4']}>
                                    <Panel key="1" header={<FormattedMessage id="app.statistics.download" defaultMessage="下载" />}>
                                        <Row gutter={16} type="flex">
                                            <Col span={8}><Button type="primary" onClick={exportPNG}>PNG</Button></Col>
                                            <Col span={8}><Button type="primary" onClick={exportPDF}>PDF</Button></Col>
                                            <CSVLink data={chart_data} filename={chart_title + ".csv"}>
                                                <Col span={8}><Button type="primary">XLS</Button></Col>
                                            </CSVLink>
                                        </Row>
    
                                    </Panel>
    
                                    <Panel key="2" header={<FormattedMessage id="app.statistics.description" defaultMessage="描述"/>}>
    
                                        {chart_desc}
                                    </Panel>
    
                                     <Panel key="3" header={<FormattedMessage id="app.statistics.source" defaultMessage="数据源"/>}>
                                        {data_source}
                                    </Panel>
    
                                    <Panel key="4" header={<FormattedMessage id="app.statistics.source-link" defaultMessage="数据源链接"/>}>
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
