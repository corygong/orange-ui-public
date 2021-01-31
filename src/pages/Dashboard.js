import React, { useState, useEffect } from 'react';
import {Layout , Collapse, Form, DatePicker, Select, Row, Col, message, Radio, Button} from 'antd'

import axios from 'axios';
import { getTimeDistance } from '../utils/utils';


import dists from '../utils/distUtils';
import {FormattedMessage, intl}  from 'react-intl';

import moment from 'moment';


import DashboardBasicMetric from '../components/DashboardBasicMetric'
import DashboardChart from '../components/DashboardChart';
import DashboardChartWithoutDistrict from '../components/DashboardChartWithoutDistrict';


const {provinceData, cityData} = dists;

const {Content} = Layout;
const {Panel} = Collapse;
const {Option} = Select;
// const currYear = new Date().getFullYear().toString()
const currYear = '2019'


export default function Dashboard(props) {


    const [form] = Form.useForm();


    const [currentTabKey, setCurrentTabKey] = useState("");
    const [rangePickerValue, setRangePickerValue] = useState(getTimeDistance('year'));

    const [distData, setDistData] = useState([]);
    const [basicData, setBasicData] = useState({});
    const [chartData, setChartData] = useState([]);


    const [provinceValue, setProvinceValue] = useState(provinceData[0])

    const [dateValue, setDateValue] = useState('2019-01');
    const [cities, setCities] = useState(cityData[provinceData[0]]);
    const [cityValue, setCityValue] = useState(cityData[provinceData[0]][0]);
    const [radioValue, setRadioValue] = useState(3);
    const [starValue, setStarValue] = useState(5);


    const [activeKey, setActivekey] = useState(['1'])


    const onPanelChange = (value) => {

        setDateValue(value);
        setPanelStatus(false);
    };
    const [dateTemplate, setDateTemplate] = useState(<DatePicker mode="month"
                                                        format='YYYY-MM'
                                                        onPanelChange={onPanelChange}
                                                        value={'2019-01'}

                                                    />); 
    const [panelIsOpen, setPanelStatus] = useState(false);
    const [basicLoading, setBasicLoading] = useState(true);
        
  

    useEffect(() => {
        let formValues = {};
        formValues['city'] = '北京'
        formValues['star'] = '5'
        formValues['radio'] = 3
        formValues['date'] = '2019-01'

        axios.post('/api/hotel/dashboard/basicMetrics/', JSON.stringify(formValues), { headers:{
            'Authorization': 'jwt ' +  localStorage.getItem('currentJWT'),
            'Content-Type': 'application/json'
        }}).then( res => {
            // console.log(res)

            const {data} = res;

            console.log(data)

            setBasicData(data);
            setBasicLoading(false);
        }).catch( err => {
            console.error(err);
            message.error('fail to get the basic metrics')
        })

    }, [])







    const handleSubmitBasicMetrics = (e) => {
        // e.preventDefault();


        form.validateFields().then(fieldValue => {
            // console.log(fieldValue);
            let date, formValues = {};
            if (fieldValue.radio1 == 1) {
                date = fieldValue.date1.format("YYYY")
            } else if (fieldValue.radio1 == 3) {
                date = fieldValue.date1.format("YYYY-MM")
            }

            
            formValues['city'] = fieldValue.city1.replace("市", "");

            // console.log(fieldValue)
            console.log(formValues['city'])
            if (formValues['city'] == '辖区'){
                formValues['city'] = fieldValue.province1.replace("市", "");
            }
            

            formValues['star'] = fieldValue.star1;
            formValues['date'] = date;
            formValues['radio'] = fieldValue.radio1;



            // console.log(formValues)
       
         
            setBasicLoading(true);

            axios.post('/api/hotel/dashboard/basicMetrics/', JSON.stringify(formValues), { headers:{
                'Authorization': 'jwt ' +  localStorage.getItem('currentJWT'),
                'Content-Type': 'application/json'
            }}).then( res => {
                // console.log(res)

                const {data} = res;

                console.log(data)

                setBasicData(data);
                setBasicLoading(false);
            }).catch( err => {
                console.error(err);
                message.error('fail to get the basic metrics')
            })

        }).catch(err => {
            return;
        })

   
        // form.validateFields((err, fieldValue) => {
        //     if (err) return;


        //     console.log(fieldValue)
          
            // dispatch({
            //     type: 'chart/fetchBasicMetrics',
            //     payload: formValues,
            //     callback: () => {
            //         const {chart: {basicData}} = this.props;
            //         this.setState({
            //             basicData: basicData,
            //             basicLoading: false
            //         })
            //     }
            // });

        // });

    };


    const onProvinceChange = (value) => {

        console.log(value)

        form.setFieldsValue({
            city1: cityData[value][0]
        })


        setCities(cityData[value]);
        setCityValue(cityData[value][0]);
       


    }

    const onCityChange = (value) => {
        

        // this.setState({
        //     secondCity: value
        // })
    }

    const handleFormReset = (e) => {
        

        setBasicData({totel_hotel_num: 0, adr: 0, chain:0, vacancy: 0, yoy: 0, totel_room_num: 0, yoy_hotel_num:0, yoy_room_num:0})

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




    const starSelectChildren = [
        <Option key='1'>1</Option>,
        <Option key='2'>2</Option>,
        <Option key='3'>3</Option>,
        <Option key='4'>4</Option>,
        <Option key='5'>5</Option>,
    ];

    const handleChange = (key) => {
        // console.log(key)
        setActivekey(key)


        
    }

    return (

        <Content style={{ padding:'0 50px' }}>
      

                <Collapse activeKey={activeKey} onChange={handleChange}>
                    <Panel key='1' header={<FormattedMessage id="app.dashboard.basic-metric" defaultMessage="基本指标"/>}>
                        <Form 
                            form={form} 
                            layout="inline" 
                            onFinish={handleSubmitBasicMetrics}>

                            <Form.Item 
                                name='province1'
                                label={<FormattedMessage id="form.province.label" defaultMessage="省/直辖市"/>}
                                rules={
                                    [{
                                        required: true,
                                        message: <FormattedMessage id="form.province.placeholder"/>
                                    }]
                                }
                                initialValue={provinceValue}
                                // onFieldsChange={onProvinceChange}
                            >
                                <Select
                                onChange={onProvinceChange}
                                >
                                    {provinceData.map(province => <Option
                                        key={province}>{province}</Option>)}
                                </Select>
                                
                            </Form.Item>

                            <Form.Item 
                                name='city1'
                                label={<FormattedMessage id="form.city.label" defaultMessage="城市"/>}
                                rules={
                                    [{
                                        required: true,
                                        message: <FormattedMessage id="form.city.placeholder" defaultMessage='搜索城市'/>
                                    }]
                                }
                                initialValue={cityValue}
                                onChange={onCityChange}                

                            >
                                    <Select
                                    >
                                        {cities.map(city => <Option key={city}>{city}</Option>)}

                                    </Select>
                                
                            </Form.Item>


                            <Form.Item 
                            
                                name='radio1'
                                label={<FormattedMessage id="form.date.radio" defaultMessage="时间选项" />}
                                initialValue={radioValue}
                                onChange={onRadioChange}
                            >
                                
                                    <Radio.Group>
                                        <Radio value={1}>{<FormattedMessage id="form.date.yearly" defaultMessage="年"/>}</Radio>

                                        <Radio value={3}>{<FormattedMessage id="form.date.monthly" defaultMessage="月"/>}</Radio>
                                    </Radio.Group>
                            


                            </Form.Item>
                            <Form.Item
                                name='date1'
                                rules={[{
                                        required: true,
                                        message: <FormattedMessage id="form.province.placeholder"/>
                                    }]
                                }
                                trigger='onPanelChange'
                                setFieldsValue={dateValue}
                                initialValue={moment(currYear, 'YYYY')}
                            
                            >
                                {dateTemplate}
                                    
                                
                            </Form.Item>
                            <Form.Item 
                                name='star1'
                                label={<FormattedMessage id="form.star.label" defaultMessage='酒店星级'/>}
                                rules={
                                    [{
                                        required: true,
                                        message: <FormattedMessage id='validation.stars.required'/>
                                    }]
                                }
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
                                <Button type="primary" htmlType="submit" >
                                    <FormattedMessage id="app.label.search.title" defaultMessage='搜索'/>
                                </Button>
                                <Button style={{marginLeft: 10}} onClick={handleFormReset}>
                                    <FormattedMessage id="app.label.reset.title" defaultMessage='重置'/>
                                </Button>
                            </Form.Item>
                        </Form>
                        <DashboardBasicMetric loading={basicLoading} data={basicData}/>
                    </Panel>
                    <Panel key='2' header={<FormattedMessage id="app.dashboard.hotel-analysis-hotelName" defaultMessage='酒店分析(酒店名)'/>}>
                        {/*<HotelAnalysis loading={basicLoading} visitData={distData}/>*/}
                        <Row gutter={24}>
                            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                <DashboardChart  chartData = {chartData} tag = {"adr"} metric={'hotelName'}/>
                            </Col>
                            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                <DashboardChart  chartData = {chartData} tag = {"roomNum"} metric={'hotelName'}/>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel key='3' header={<FormattedMessage id="app.dashboard.hotel-analysis-zone" defaultMessage='酒店分析(商圈)'/>}>
                        {/*<HotelAnalysis loading={basicLoading} visitData={distData}/>*/}
                        <Row gutter={24}>
                            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                <DashboardChart chartData = {chartData} tag = {"adr"} metric={'zone'}/>
                            </Col>
                            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                <DashboardChart chartData = {chartData} tag = {"roomNum"} metric={'zone'}/>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel key='4' header={<FormattedMessage id="app.dashboard.hotel-analysis-district" defaultMessage='酒店分析(区)'/>}>
                        <Row gutter={24}>
                            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                <DashboardChartWithoutDistrict  chartData = {chartData} tag = {"adr"} metric={'district'}/>
                            </Col>
                            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                <DashboardChartWithoutDistrict  chartData = {chartData} tag = {"roomNum"} metric={'district'}/>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel key='5' header={<FormattedMessage id="app.dashboard.hotel-analysis-group_cn" defaultMessage='酒店分析(品牌)'/>}>
                        <Row gutter={24}>
                            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                <DashboardChart  chartData = {chartData} tag = {"adr"} metric={'group_cn'}/>
                            </Col>
                            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                <DashboardChart  chartData = {chartData} tag = {"roomNum"} metric={'group_cn'}/>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
        </Content>
    )
}
