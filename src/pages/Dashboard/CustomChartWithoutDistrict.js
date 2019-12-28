import {PureComponent} from "react";
import {Button, Card, Col, DatePicker, Form, Radio, Select, Row} from "antd";
import React from "react";
import {Bar} from '@/components/Charts';

import {FormattedMessage, formatMessage} from 'umi/locale';


import dists from '@/utils/distUtil';

import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import moment from 'moment';
import {connect} from "dva";

// require('highcharts/indicators/indicators')(Highcharts);
// require('highcharts/indicators/pivot-points')(Highcharts);
// require('highcharts/indicators/macd')(Highcharts);
// require('highcharts/modules/exporting')(Highcharts);
// require('highcharts/modules/map')(Highcharts);
// require('highcharts/indicators/indicators')(Highcharts);
// require('highcharts/indicators/pivot-points')(Highcharts);
// require('highcharts/indicators/macd')(Highcharts);
// require('highcharts/modules/exporting')(Highcharts);
// require('highcharts/modules/map')(Highcharts);

const {Option} = Select;
const {provinceData, cityData, areaData} = dists;
const currYear = new Date().getFullYear().toString()
window.moment = moment
NoDataToDisplay(Highcharts)

@connect(({chart, loading}) => ({
    chart,
    basicLoading: loading.models.chart,
}))
@Form.create({})
class CustomChartWithoutDistrict extends PureComponent {

    state = {
        cities: cityData[provinceData[0]],
        cityValue: cityData[provinceData[0]][0],

        chartData: {},
        dateValue: new Date().getFullYear().toString(),
        radioValue: 1,
        chartTitle: "",
        starValue: 5,
        isLoading: true,
        dateTemplate: <DatePicker mode="year"
                                  format='YYYY'
                                  onPanelChange={this.onPanelChange}
                                  value={new Date().getFullYear().toString()}
        />
    }

    componentWillMount() {


        const {dispatch, metric, tag} = this.props;
        const {dateValue, cityValue, areaValue, starValue, radioValue, isLoading} = this.state;

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


        dispatch({
            type: 'chart/fetchHotelAnalysis',
            payload: formValus,
            callback: () => {
                console.log(this.props)
                const {chart: {chartData}} = this.props;


                this.setState({
                    chartData: chartData,
                    isLoading: false,
                    chartTitle: cityValue  +"各区域"+ radioChartTitle + starValue + "星级酒店表(" + tagChartTitle+")"
                })

            }
        })
    }


    onProvinceChange = (value) => {
        this.props.form.setFieldsValue({
            city: cityData[value][0],

        })


        this.setState({
            cities: cityData[value],
            cityValue: cityData[value][0],


        });
    }

    onCityChange = (value) => {



        this.setState({
            cityValue: value
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
    onSubmitHandler = (e) => {
        e.preventDefault();
        const {dispatch, form, metric, tag} = this.props;
        form.validateFields((err, fieldValue) => {
            if (err) return;


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
            this.setState({
                formValues: formValues,
                isLoading: true
            })
            dispatch({
                type: 'chart/fetchHotelAnalysis',
                payload: formValues,
                callback: () => {
                    const {chart: {chartData}} = this.props;
                    this.setState({
                        chartData: chartData,
                        isLoading: false,
                        chartTitle: formValues['city'] +"各区域" + radioChartTitle + fieldValue.star + "星级酒店表(" + tagChartTitle + ")"
                    })
                }
            });

        });
    }


    handleFormReset = () => {

    }

    render() {

        const {form: {getFieldDecorator}, tag} = this.props;

        const {cityValue, cities, dateValue, areas, areaValue, radioValue, starValue, dateTemplate, isLoading, chartData, chartTitle} = this.state;


        const starSelectChildren = [
            <Option key='1'>1</Option>,
            <Option key='2'>2</Option>,
            <Option key='3'>3</Option>,
            <Option key='4'>4</Option>,
            <Option key='5'>5</Option>,
        ];
        return (
            <div>
                <Form layout="inline" onSubmit={this.onSubmitHandler}>

                    <Form.Item label={<FormattedMessage id="form.province.label"/>}>
                        {getFieldDecorator('province', {
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
                        {getFieldDecorator('city', {
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
                        {getFieldDecorator('radio', {

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
                        {getFieldDecorator('date', {
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
                        {getFieldDecorator('star', {
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
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            <FormattedMessage id="app.label.search.title"/>
                        </Button>
                        <Button style={{marginLeft: 10}} onClick={this.handleFormReset}>
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
}


export default CustomChartWithoutDistrict