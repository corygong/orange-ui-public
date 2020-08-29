import React, {useState, useEffect} from "react";
import {Button, Card, Col, DatePicker, Form, Radio, Select, Row, message} from "antd";


import {FormattedMessage} from 'react-intl';


import dists from '../utils/distUtils';

import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import moment from 'moment';

import axios from 'axios';

const {Option} = Select;
const {provinceData, cityData, areaData} = dists;
const currYear = new Date().getFullYear().toString()
window.moment = moment
NoDataToDisplay(Highcharts)


export default function DashboardChartWithoutDistrict(props) {

    const [form] = Form.useForm();
    const [cities, setCities] = useState(cityData[provinceData[0]]);
    const [cityValue, setCityValue] = useState(cityData[provinceData[0]][0]);
    const [chartData, setChartData] = useState({});

    const [dateValue, setDateValue] = useState(new Date().getFullYear().toString() );

    const [radioValue, setRadioValue] = useState(1);
    const [starValue, setStarValue] = useState(5);

    const [chartTitle, setChartTitle] = useState('');
    const [ isLoading, setIsLoading] = useState(true);

    const onPanelChange = (value) => {

        // setDateValue(value);
        // setPanelStatus(false);
    };
    const [ dateTemplate, setDateTemplate ] = useState(<DatePicker mode="year"
        format='YYYY'
        onPanelChange={onPanelChange}
        value={new Date().getFullYear().toString()}
    />);


    const { metric, tag} = props;


    useEffect(() => {


        const { metric, tag } = props;

        let formValus = {}
        formValus['date'] = dateValue;
        formValus['city'] = cityValue;
    
        formValus['star'] = starValue;
        formValus['radio'] = radioValue;
        formValus['tag'] = tag;
        formValus['metric'] = metric;
        let radioChartTitle = "", tagChartTitle = ""
        if (radioValue == '1') {
            radioChartTitle = dateValue + "年度"
        } else if (radioValue == '3') {
            radioChartTitle = dateValue + "月度"
        }
    
        if (tag == "adr") {
            tagChartTitle = "ADR"
        } else if (tag == "roomNum") {
            tagChartTitle = "房间数"
        }
    
    
        axios.post('', formValus).then( res => {
    
    
            console.log(res);
    
        }).catch( err => {
            message.error('fail to get hotal analysis');
        })
    }, [])


        // dispatch({
        //     type: 'chart/fetchHotelAnalysis',
        //     payload: formValus,
        //     callback: () => {
        //         console.log(this.props)
        //         const {chart: {chartData}} = this.props;


        //         this.setState({
        //             chartData: chartData,
        //             isLoading: false,
        //             chartTitle: cityValue  +"各区域"+ radioChartTitle + starValue + "星级酒店表(" + tagChartTitle+")"
        //         })

        //     }
        // })
    


    const onProvinceChange = (value) => {
        form.setFieldsValue({
            city: cityData[value][0],

        })



        setCities(cityData[value]);
        setCityValue(cityValue[value][0]);
       
    }

    const onCityChange = (value) => {

        setCityValue(value);

    }

    const onRadioChange = (e) => {

        if (e.target.value == 1) {

            setDateTemplate(<DatePicker mode="year"
                format='YYYY'
                onPanelChange={onPanelChange}

            />);
           
        } else if (e.target.value == 3) {
            setDateTemplate(<DatePicker mode="month"
                format='YYYY-MM'
                onPanelChange={onPanelChange}

            />);
            
        }


    }
    const onSubmitHandler = (e) => {
        e.preventDefault();

        form.validateFields().then( fieldValue => {

            console.log(fieldValue)
            let date, formValues = {};
            if (fieldValue.radio == 1) {
                date = fieldValue.date.format("YYYY")
            } else if (fieldValue.radio == 3) {
                date = fieldValue.date.format("YYYY-MM")
            }


            formValues['city'] = fieldValue.city;
            // formValues['district'] = fieldValue.area;
            formValues['star'] = fieldValue.star;
            formValues['date'] = date;
            formValues['radio'] = fieldValue.radio;

            formValues['tag'] = tag;
            formValues['metric'] = metric;
            let radioChartTitle = "", tagChartTitle = ""
            if (fieldValue.radio == '1') {
                radioChartTitle = date + "年度"
            } else if (fieldValue.radio == '3') {
                radioChartTitle = date + "月度"
            }

            if (tag == "adr") {
                tagChartTitle = "ADR"
            } else if (tag == "roomNum") {
                tagChartTitle = "房间数"
            }
            // this.setState({
            //     formValues: formValues,
            //     isLoading: true
            // })

            setIsLoading(true);

            axios.post('', formValues).then( res => {

            }).catch( err => {
                console.error(err);
                message.error('fail to get hotel analysis')
            })
        }).catch( err => {
            return;
        })
        
   



           
            // dispatch({
            //     type: 'chart/fetchHotelAnalysis',
            //     payload: formValues,
            //     callback: () => {
            //         const {chart: {chartData}} = this.props;
            //         this.setState({
            //             chartData: chartData,
            //             isLoading: false,
            //             chartTitle: formValues['city'] +"各区域" + radioChartTitle + fieldValue.star + "星级酒店表(" + tagChartTitle + ")"
            //         })
            //     }
            // });

  
    }


    const handleFormReset = () => {

    }






    const starSelectChildren = [
        <Option key='1'>1</Option>,
        <Option key='2'>2</Option>,
        <Option key='3'>3</Option>,
        <Option key='4'>4</Option>,
        <Option key='5'>5</Option>,
    ];
    return (
        <div>
            <Form layout="inline" onSubmit={onSubmitHandler}>

                <Form.Item 
                    name='province'
                    label={<FormattedMessage id="form.province.label"/>}
                    rules={[{
                        required: true,
                        message: <FormattedMessage id="form.province.placeholder"/>
                    }]}
                    initialValue= {provinceData[0]}
                    onChange= {onProvinceChange}

                >
                        <Select
                        >
                            {provinceData.map(province => <Option
                                key={province}>{province}</Option>)}
                        </Select>
            
                </Form.Item>
                <Form.Item 
                    name='city'
                    label={<FormattedMessage id="form.city.label"/>}
                    rules={[{
                        required: true,
                        message: <FormattedMessage id="form.city.placeholder"/>,

                    }]}
                    initialValue={cityValue}
                    onChange={onCityChange}
                >
                    
                        <Select
                        >
                            {cities.map(city => <Option key={city}>{city}</Option>)}

                        </Select>
                   
                </Form.Item>

                <Form.Item 
                    name='radio'
                    label={<FormattedMessage id="form.date.radio" defaultMessage='时间选项'/>}
                    initialValue={radioValue}
                    onChange={onRadioChange}
                >
                    
                        <Radio.Group>
                            <Radio value={1}>{<FormattedMessage id="form.date.yearly"/>}</Radio>

                            <Radio value={3}>{<FormattedMessage id="form.date.monthly"/>}</Radio>
                        </Radio.Group>
                  


                </Form.Item>
                <Form.Item
                    name='date'
                    rules={[{
                        required: true,
                        message: <FormattedMessage id="form.province.placeholder"/>
                    }]}
                    trigger='onPanelChange'
                    setFieldsValue={dateValue}
                    initialValue={moment(currYear, 'YYYY')}
                >
                    {dateTemplate}
                        
                    
                </Form.Item>
                <Form.Item 
                    name='star'
                    label={<FormattedMessage id="form.star.label"/>}
                    rules={[{
                        required: true,
                        message: <FormattedMessage id='validation.stars.required' defaultMessage='请选择酒店的星级'/>
                    }]}
                    initialValue='5'
                >
                    
                        <Select
                            style={{width: '100%'}}
                            placeholder={<FormattedMessage id="form.star.placeholder"/>}
                        >
                            {starSelectChildren}
                        </Select>
                    
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        <FormattedMessage id="app.label.search.title"/>
                    </Button>
                    <Button style={{marginLeft: 10}} onClick={handleFormReset}>
                        <FormattedMessage id="app.label.reset.title"/>
                    </Button>
                </Form.Item>
            </Form>
            <Card title="" loading={isLoading} style={{marginTop: 12}}>


                <HighchartsReact
                    highcharts={Highcharts}
                    // constructorType={'stockChart'}
                    // rangeSelector={{selected: 1}}
                    options={{
                        title: {
                            text: chartTitle
                        },
                        series: [{
                            name: tag,
                            data: chartData.metric_data,
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
    )

                
    


}

