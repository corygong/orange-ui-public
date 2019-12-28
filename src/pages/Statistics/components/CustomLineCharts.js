
import {PureComponent} from "react";
import {Button, Card, Col, DatePicker, Form, Radio, Select, Row} from "antd";
import React from "react";
import {Bar} from '@/components/Charts';

import {FormattedMessage, formatMessage} from 'umi/locale';



import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import moment from 'moment';


window.moment = moment
NoDataToDisplay(Highcharts)



class CustomLineCharts extends PureComponent {



    state = {}


    componentWillMount() {


    }

    render() {

        const {title, tag, data} = this.props;
        return (
            <div>
                <Card title="" loading={isLoading} style={{marginTop: 12}}>


                    <HighchartsReact
                        highcharts={Highcharts}
                        // constructorType={'stockChart'}
                        // rangeSelector={{selected: 1}}
                        options={{
                            title: {
                                text: title
                            },
                            series: [{
                                name: tag,
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
                                }
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: tag
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
            </div>
        );
    }
}


export default CustomLineCharts;