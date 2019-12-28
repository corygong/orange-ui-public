import React, {Component, PureComponent, Suspense} from 'react';
import {connect} from 'dva';
import {Row, Col, Icon, Menu, Dropdown, Form, Select, Button, Collapse, Radio, DatePicker, Card} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import {getTimeDistance} from '@/utils/utils';
import styles from './Index.less';
import PageLoading from '@/components/PageLoading';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment'

import {FormattedMessage, formatMessage} from 'umi/locale';

const BasicMetric = React.lazy(() => import('./BasicMetric'));
// const HotelAnalysis = React.lazy(() => import('./HotelAnalysis'));
const CustomChart = React.lazy(() => import('./CustomChart'));
const CustomChartWithoutDistrict = React.lazy(() => import('./CustomChartWithoutDistrict'));
const {Option} = Select;

import dists from '@/utils/distUtil';

const {provinceData, cityData} = dists;

const {Panel} = Collapse

const currYear = new Date().getFullYear().toString()


@connect(({chart, loading}) => ({
    chart,
    basicLoading: loading.models.chart,
}))
@Form.create({})
class Index extends PureComponent {
    state = {

        currentTabKey: '',
        rangePickerValue: getTimeDistance('year'),
        distData: [],
        basicData: {},
        chartData : [],
        dateValue: new Date().getFullYear().toString(),
        cities: cityData[provinceData[0]],
        cityValue: cityData[provinceData[0]][0],
        radioValue: 1,
        starValue: 5,
        dateTemplate: <DatePicker mode="year"
                                  format='YYYY'
                                  onPanelChange={this.onPanelChange}
                                  value={new Date().getFullYear().toString()}

        />,
        panelIsOpen: false,
        basicLoading:true,
        districtADRChartData : {},
        zoneADRChartData: {},
        brandADRChartData: {},
        hotelNameADRChartData: {}

    };

    componentWillMount() {
        const {dispatch} = this.props;
        const {dateValue, cityValue, starValue, radioValue, basicLoading} = this.state;

        let basic_payload = {}, hotel_Analysis_pauyload = {}
        basic_payload['date'] = dateValue;
        basic_payload['city'] = cityValue;
        basic_payload['star'] = starValue;
        basic_payload['radio'] = radioValue;

        dispatch({
            type: 'chart/fetchBasicMetrics',
            payload: basic_payload,
            callback: () => {

                const {chart: {basicData}} = this.props;

                this.setState({
                    basicData: basicData,
                    basicLoading: false
                })

            }
        })
       // dispatch({
       //      type: 'chart/fetchHotelAnalysis',
       //      payload: basic_payload,
       //      callback: () => {
       //          console.log(this.props)
       //          const {chart: {chartData}} = this.props;
       //
       //
       //
       //          this.setState({
       //              chartData: chartData,
       //              isLoading: false
       //          })
       //
       //      }
       //  })






    }


    handleTabChange = key => {
        this.setState({
            currentTabKey: key,
        });
    };

    handleRangePickerChange = rangePickerValue => {
        const {dispatch} = this.props;
        this.setState({
            rangePickerValue,
        });

        dispatch({
            type: 'chart/fetchSalesData',
        });
    };


    handleSubmitBasicMetrics = (e) => {
        e.preventDefault();
        const {dispatch, form} = this.props;
        form.validateFields((err, fieldValue) => {
            if (err) return;


            console.log(fieldValue)
            let date, formValues = {};
            if (fieldValue.radio1 == 1) {
                date = fieldValue.date1.format("YYYY")
            } else if (fieldValue.radio1 == 3) {
                date = fieldValue.date1.format("YYYY-MM")
            }

            formValues['city'] = fieldValue.city1;

            formValues['star'] = fieldValue.star1;
            formValues['date'] = date;
            formValues['radio'] = fieldValue.radio1;


            this.setState({
                formValues: formValues,
                basicLoading: true
            })
            dispatch({
                type: 'chart/fetchBasicMetrics',
                payload: formValues,
                callback: () => {
                    const {chart: {basicData}} = this.props;
                    this.setState({
                        basicData: basicData,
                        basicLoading: false
                    })
                }
            });

        });

    };


    //
    // selectDate = type => {
    //   const { dispatch } = this.props;
    //   this.setState({
    //     rangePickerValue: getTimeDistance(type),
    //   });
    //
    //   dispatch({
    //     type: 'chart/fetchSalesData',
    //   });
    // };

    // isActive = type => {
    //   const { rangePickerValue } = this.state;
    //   const value = getTimeDistance(type);
    //   if (!rangePickerValue[0] || !rangePickerValue[1]) {
    //     return '';
    //   }
    //   if (
    //     rangePickerValue[0].isSame(value[0], 'day') &&
    //     rangePickerValue[1].isSame(value[1], 'day')
    //   ) {
    //     return styles.currentDate;
    //   }
    //   return '';
    // };


    onProvinceChange = (value) => {

        this.props.form.setFieldsValue({
            city1: cityData[value][0]
        })


        this.setState({
            cities: cityData[value],
            cityValue: cityData[value][0]
        });


    }

    onCityChange = (value) => {

        this.setState({
            secondCity: value
        })
    }


    onRadioChange = (e) => {

        if (e.target.value == 1) {
            this.setState({
                dateTemplate: <DatePicker mode="year"
                                          format='YYYY'
                                          onPanelChange={this.onPanelChange}
                                          // onFocus={() => {
                                          //     this.setState({panelIsOpen: true})
                                          // }}
                                          // onBlur={() => {
                                          //     this.setState({panelIsOpen: false})
                                          // }}
                                          // open={this.state.panelIsOpen}
                />
            });
        } else if (e.target.value == 3) {
            this.setState({
                dateTemplate: <DatePicker mode="month"
                                          format='YYYY-MM'
                                          onPanelChange={this.onPanelChange}
                                          // onFocus={() => {
                                          //     this.setState({panelIsOpen: true})
                                          // }}
                                          // onBlur={() => {
                                          //     this.setState({panelIsOpen: false})
                                          // }}
                                          // open={this.state.panelIsOpen}
                />
            })
        }


    }

    //
    // renderDateChoiceTemplate = () => {
    //
    //     return (
    //         <DatePicker mode="year"/>
    //     )
    //
    // }
    cb = (key) => {
        console.log(key)
    }

    onPanelChange = (value) => {
        this.setState({
            dateValue: value,
            panelIsOpen: false
        });
    };


    render() {

        console.log(this.state)
        const {
            rangePickerValue, salesType, currentTabKey, distData, cityValue, cities, basicData,chartData, dateTemplate, dateValue, startValue, radioValue,basicLoading
        } = this.state;
        const {chart, form: {getFieldDecorator}, dispatch} = this.props;
        const {
            visitData,
        } = chart;


        const starSelectChildren = [
            <Option key='1'>1</Option>,
            <Option key='2'>2</Option>,
            <Option key='3'>3</Option>,
            <Option key='4'>4</Option>,
            <Option key='5'>5</Option>,
        ];




        const {submitting} = this.props;

        return (
            <PageHeaderWrapper title="">
                <GridContent>
                    <Suspense fallback={<PageLoading/>}>

                        <Collapse defaultActiveKey={['1', '2']} onChange={this.cb}>
                            <Panel key='1' header={<FormattedMessage id="app.dashboard.basic-metric"/>}>
                                <Form layout="inline" onSubmit={this.handleSubmitBasicMetrics}>

                                    <Form.Item label={<FormattedMessage id="form.province.label"/>}>
                                        {getFieldDecorator('province1', {
                                            rules: [{
                                                required: true,
                                                message: <FormattedMessage id="form.province.placeholder"/>
                                            }],
                                            initialValue: provinceData[0],
                                            onChange: this.onProvinceChange

                                        })(
                                            <Select
                                            >
                                                {provinceData.map(province => <Option
                                                    key={province}>{province}</Option>)}
                                            </Select>
                                        )}
                                    </Form.Item>

                                    <Form.Item label={<FormattedMessage id="form.city.label"/>}>
                                        {getFieldDecorator('city1', {
                                            rules: [{
                                                required: true,
                                                message: <FormattedMessage id="form.city.placeholder"/>,

                                            }],
                                            initialValue: cityValue,
                                            onChange: this.onCityChange,

                                            // getValueFromEvent: this.onSecondCityChange
                                        })(
                                            <Select
                                            >
                                                {cities.map(city => <Option key={city}>{city}</Option>)}

                                            </Select>
                                        )}
                                    </Form.Item>


                                    <Form.Item label={<FormattedMessage id="form.date.radio"/>}>
                                        {getFieldDecorator('radio1', {

                                            initialValue: radioValue,
                                            onChange: this.onRadioChange

                                        })(
                                            <Radio.Group>
                                                <Radio value={1}>{<FormattedMessage id="form.date.yearly"/>}</Radio>

                                                <Radio value={3}>{<FormattedMessage id="form.date.monthly"/>}</Radio>
                                            </Radio.Group>
                                        )}


                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('date1', {
                                            rules: [{
                                                required: true,
                                                message: <FormattedMessage id="form.province.placeholder"/>
                                            }],
                                            trigger: 'onPanelChange',
                                            setFieldsValue: {dateValue},
                                            initialValue: moment(currYear, 'YYYY')


                                        })(
                                            dateTemplate
                                        )}
                                    </Form.Item>
                                    <Form.Item label={<FormattedMessage id="form.star.label"/>}>
                                        {getFieldDecorator('star1', {
                                            rules: [{
                                                required: true,
                                                message: formatMessage({id: 'validation.stars.required'})
                                            }],
                                            initialValue: '5',
                                        })(
                                            <Select
                                                style={{width: '100%'}}
                                                placeholder={<FormattedMessage id="form.star.placeholder"/>}
                                            >
                                                {starSelectChildren}
                                            </Select>,
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={submitting}>
                                            <FormattedMessage id="app.label.search.title"/>
                                        </Button>
                                        <Button style={{marginLeft: 10}} onClick={this.handleFormReset}>
                                            <FormattedMessage id="app.label.reset.title"/>
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <BasicMetric loading={basicLoading} data={basicData}/>
                            </Panel>
                            <Panel key='2' header={<FormattedMessage id="app.dashboard.hotel-analysis-hotelName"/>}>
                                {/*<HotelAnalysis loading={basicLoading} visitData={distData}/>*/}
                                <Row gutter={24}>
                                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                         <CustomChart dispatch = {dispatch} chartData = {chartData} tag = {"adr"} metric={'hotelName'}/>
                                    </Col>
                                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                        <CustomChart dispatch = {dispatch} chartData = {chartData} tag = {"roomNum"} metric={'hotelName'}/>
                                    </Col>
                                </Row>
                            </Panel>
                            <Panel key='3' header={<FormattedMessage id="app.dashboard.hotel-analysis-zone"/>}>
                                {/*<HotelAnalysis loading={basicLoading} visitData={distData}/>*/}
                                <Row gutter={24}>
                                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                         <CustomChart dispatch = {dispatch} chartData = {chartData} tag = {"adr"} metric={'zone'}/>
                                    </Col>
                                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                        <CustomChart dispatch = {dispatch} chartData = {chartData} tag = {"roomNum"} metric={'zone'}/>
                                    </Col>
                                </Row>
                            </Panel>
                            <Panel key='4' header={<FormattedMessage id="app.dashboard.hotel-analysis-district"/>}>
                                <Row gutter={24}>
                                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                         <CustomChartWithoutDistrict dispatch = {dispatch} chartData = {chartData} tag = {"adr"} metric={'district'}/>
                                    </Col>
                                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                        <CustomChartWithoutDistrict dispatch = {dispatch} chartData = {chartData} tag = {"roomNum"} metric={'district'}/>
                                    </Col>
                                </Row>
                            </Panel>
                            <Panel key='5' header={<FormattedMessage id="app.dashboard.hotel-analysis-group_cn"/>}>
                                <Row gutter={24}>
                                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                         <CustomChart dispatch = {dispatch} chartData = {chartData} tag = {"adr"} metric={'group_cn'}/>
                                    </Col>
                                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                        <CustomChart dispatch = {dispatch} chartData = {chartData} tag = {"roomNum"} metric={'group_cn'}/>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                    </Suspense>

                </GridContent>
            </PageHeaderWrapper>
        );
    }
}

export default Index;