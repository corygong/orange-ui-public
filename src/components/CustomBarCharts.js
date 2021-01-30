
import React, {memo, useRef } from "react";
import {Button, Card, Col, DatePicker, Form, Radio, Select, Row} from "antd";



import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import moment from 'moment';


window.moment = moment
NoDataToDisplay(Highcharts)



const CustomBarCharts=memo(({chartRef, loading, title, data, xAxis, yAxis}) =>  (

                <Card title="" loading={loading}>


                    <HighchartsReact
                        highcharts={Highcharts}
                        callback = {chart => (chartRef.current = chart)}
                    
                        // constructorType={'stockChart'}
                        // rangeSelector={{selected: 1}}
                        options={{
                            title: {
                                text: title
                            },
                            series: [{
                                name: title,
                                data: data,
                                dataLabels: {
                                    enabled: false,
                                    rotation: -90,
                                    color: '#FFFFFF',
                                    align: 'right',
                                    format: '{point.y:.1f}', // one decimal
                                    y: 10// 10 pixels down from the top
                                    // style: {
                                    //     fontSize: '13px',
                                    //     fontFamily: 'Verdana, sans-serif'
                                    // }
                                }
                            }],
                          
                            chart: {
                                type: 'column'
                            },
                            credits: {
                                enabled: false
                            },
                            legend: {
                                enabled: false
                            },
                            xAxis: {
                                type: 'category',
                                labels: {
                                    rotation: -45,
                                    style: {
                                        fontSize: '13px',
                                        fontFamily: 'Verdana, sans-serif'
                                    }
                                },
                                title: {
                                    text: xAxis
                                }
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: yAxis
                                }
                            },
                            lang: {
                                noData: "No Data to Display"
                            },
                            noData: {
                                style: {
                                    fontWeight: 'bold'
                                }
                            },
                            time: {
                                timezone: 'Asia/Shanghai'
                            },
                            navigation: {
                                buttonOptions: {
                                    enabled: true
                                }
                            }
                        }}
                    />

                </Card>
));

export default CustomBarCharts;
