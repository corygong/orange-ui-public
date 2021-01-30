import React, {memo} from "react";
import {Button, Card, Col, DatePicker, Form, Radio, Select, Row} from "antd";



import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import moment from 'moment';


window.moment = moment
NoDataToDisplay(Highcharts)



const CustomLineCharts=memo(({chartRef, categories, loading, title, data, xAxis, yAxis}) =>  (

                <Card title="" loading={loading} style={{marginTop: 12}}>


                    <HighchartsReact
                        highcharts={Highcharts}
                        // constructorType={'stockChart'}
                        // rangeSelector={{selected: 1}}
                        callback = {chart => (chartRef.current = chart)}
                        options={{
                            title: {
                                text: title
                            },
                            // series: [{
                            //     name: title,
                            //     data: data,
                            //     dataLabels: {
                            //         enabled: false,
                            //         rotation: -90,
                            //         color: '#FFFFFF',
                            //         align: 'right',
                            //         format: '{point.y:.1f}', // one decimal
                            //         y: 10
                            //     }
                            // }],

                            series: data,
                            // series: [{
                            //     name: '巴西',
                            //     data: [107, 31, 635, 203, 2,2]
                            // }, {
                            //     name: '西班牙',
                            //     data: [133, 156, 947, 408, 6]
                            // }, {
                            //     name: '美国',
                            //     data: [973, 914, 4054, 732,0, 8]
                            // }],
                            // chart: {
                            //     type: 'column'
                            // },
                            credits: {
                                enabled: false
                            },
                            // legend: {
                            //     enabled: false
                            // },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle'
                            },
                            xAxis: {
                                // type: 'category',
                                categories: categories,
                                title: {
                                    text: xAxis
                                },
                                labels: {
                                    rotation: -45,
                                    style: {
                                        fontSize: '13px',
                                        fontFamily: 'Verdana, sans-serif'
                                    }
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


export default CustomLineCharts;