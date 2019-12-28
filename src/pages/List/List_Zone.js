import React, {PureComponent} from "react";

import {connect} from "dva";
import {
    Row,
    Col,
    Form,
    Select,
    Card,
    DatePicker,
    Button
} from "antd";
import {CircularProgress} from '@material-ui/core';
import MaterialTable from 'material-table';
import GridContent from "@/components/PageHeaderWrapper/GridContent";

import dists from '@/utils/distUtil';

const {provinceData, cityData, areaData} = dists;

import {formatMessage, FormattedMessage} from "umi/locale";

import styles from "./Common.less";

const {RangePicker} = DatePicker;

const {Option} = Select;


@connect(({query, loading}) => ({
    query,
    loading: loading.models.query
}))

@Form.create()
class List_Zone extends PureComponent {

    state = ({
        mode: ["month", "month"],
        value: [],
        formValues: {},
        tableDataDaily: [],
        tableDataWeekly: [],
        tableDataMonthly: [],
        tableDataQuarterly: [],
        key: "Daily",
        isLoading: false,
        cities: cityData[provinceData[0]],
        secondCity: cityData[provinceData[0]][0],
        areas: areaData[cityData[provinceData[0]][0]],
        thirdArea: areaData[cityData[provinceData[0]][0]][1],
        zones: [],
        fourthZone: ''
    });

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'query/fetchZonesByCity',
            payload: {
                city: cityData[provinceData[0]][0]
            },
            callback: () => {
                const {query} = this.props;

                const {zones} = query

                const {zone_list} = zones

                this.setState({
                    zones: zone_list,
                    fourthZone: [zone_list[0]]

                })
            }
        })
    }

    onTabChange = (key, type) => {
        //console.log(key)
        //console.log(type)
        this.setState({[type]: key});
    }


    handlePanelChange = (value, mode) => {
        this.setState({
            value,
            mode: [
                mode[0] === "date" ? "month" : mode[0],
                mode[1] === "date" ? "month" : mode[1]
            ]
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        //console.log(11)

        // console.log(this.props);
        const {dispatch, form} = this.props;


        form.validateFields((err, fieldValue) => {

            // console.log(fieldValue);

            let formValues = {};
            if (err) return;

            // console.log(fieldValue.date[0].format("YYYY/MM"));


            const start = fieldValue.date[0].format("MM/YYYY");
            const end = fieldValue.date[1].format("MM/YYYY");

            // console.log()

            formValues.start = start;
            formValues.end = end;
            // formValues.city = fieldValue.city;

            // if (fieldValue.city[1] === "市辖区") {
            //     formValues.city = fieldValue.city[0].replace("市", "");
            //     formValues.districtList = fieldValue.city[2];
            // } else {
            //     formValues.city = fieldValue.city[1];
            //     formValues.districtList = fieldValue.city[2];
            // }
            // formValues.star = fieldValue.star.join(",");
            // hash tag

            formValues.city = fieldValue.city;

            const _zone_arr = Array.isArray(fieldValue.zone)? fieldValue.zone : [fieldValue.zone]
            formValues.zone = _zone_arr.join(',');
            formValues.hash = "#zone";

            this.setState({
                formValues: formValues,
                isLoading: true,
            });

            dispatch({
                type: "query/fetchData",
                payload: formValues,
                callback: () => {
                    const {query: {tableData}} = this.props;
                    const {DAY, WEEK, MONTH, QUARTER} = tableData;

                    this.setState({
                        tableDataDaily: DAY,
                        tableDataWeekly: WEEK,
                        tableDataMonthly: MONTH,
                        tableDataQuarterly: QUARTER,
                        isLoading: false
                    });
                }
            });


        });

    };

    handleFormReset = () => {
        const {form} = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
            tableDataDaily: [],
            tableDataWeekly: [],
            tableDataMonthly: [],
            tableDataQuarterly: []
        })
    };
    handleProvinceChange = (value) => {

        this.props.form.setFieldsValue({
            city: cityData[value][0]
        })


        this.setState({
            cities: cityData[value],
            secondCity: cityData[value][0],

        });

        const {dispatch} = this.props;
        dispatch({
            type: 'query/fetchZonesByCity',
            payload: {
                city: cityData[value][0]
            },
            callback: () => {
                const {query} = this.props;

                const {zones} = query

                const {zone_list} = zones

                this.setState({
                    zones: zone_list,
                    fourthZone: zone_list[0]
                })
                this.props.form.setFieldsValue({
                    zone: zone_list[0]
                })
            }
        })

    }
    onSecondCityChange = (value) => {

        // this.props.form.setFieldsValue({
        //     secondCity :value,
        //     areas: areaData[value],
        //     thirdArea: areaData[value][0]
        // })

        this.setState({
            secondCity: value,
        })

        const {dispatch} = this.props;
        dispatch({
            type: 'query/fetchZonesByCity',
            payload: {
                city: value
            },
            callback: () => {
                const {query} = this.props;

                const {zones} = query

                const {zone_list} = zones

                this.setState({
                    zones: zone_list,
                    fourthZone: zone_list[0]
                })
                this.props.form.setFieldsValue({
                    zone: zone_list[0]
                })
            }
        })
    }
    //
    onFourthZoneChange = (value) => {

        const {zones} = this.state;
        if (value.includes('all')) {
            this.setState({
                fourthZone: zones
            })
            setTimeout(() => {
                    this.props.form.setFieldsValue({
                        zone: zones
                    })
                }

                , 0)


        } else {
            this.setState({
                fourthZone: value
            })
        }
        // this.setState({
        //     fourthZone: value
        // })

    }

    render() {
        const {submitting} = this.props;
        const {
            mode, value, tableDataDaily, tableDataWeekly, tableDataMonthly, tableDataQuarterly, formValues, isLoading,
            cities,
            areas,
            secondCity,
            thirdArea,
            zones,
            fourthZone
        } = this.state;
        const formItemLayout = {
            // wrapperCol: {
            //   xs: { span: 24 },
            //   sm: { span: 16 },
            // },
        };
        const submitFormLayout = {
            // wrapperCol: {
            //   xs: { span: 24, offset: 0 },
            //   sm: { span: 10, offset: 7 },
            // },
        };

        const {
            loading,
            form
        } = this.props;
        const {getFieldDecorator} = form;


        const tabList = [
            {
                key: "Daily",
                tab:
                    <div style={{fontSize: 14}}>
                        <FormattedMessage id="app.table.tab.daily.title" defaultMessage="Daily"/>
                    </div>
            }, {
                key: "Weekly",
                tab:
                    <div style={{fontSize: 14}}>
                        <FormattedMessage id="app.table.tab.weekly.title" defaultMessage="Weekly"/>
                    </div>
            }, {
                key: "Monthly",
                tab:
                    <div style={{fontSize: 14}}>
                        <FormattedMessage id="app.table.tab.monthly.title" defaultMessage="Monthly"/>
                    </div>
            }, {
                key: "Quarterly",
                tab:
                    <div style={{fontSize: 14}}>
                        <FormattedMessage id="app.table.tab.quarterly.title" defaultMessage="Quarterly"/>
                    </div>
            }
        ];

        const columns = [
            {
                title: formatMessage({id: "app.table.header.zone"}),
                field: "zone"
            },
            {
                title: formatMessage({id: "app.table.header.date"}),
                field: "date"
            },
            {
                title: formatMessage({id: "app.table.header.star"}),
                field: "star"
            },
            {
                title: formatMessage({id: "app.table.header.city"}),
                field: "city"
            },
            {
                title: formatMessage({id: "app.table.header.adr"}),
                field: "adr"
            }
        ];

        const options = {
            columnsButton: true,
            exportButton: true
        }
        let contentList = {
            Daily:
                <div>
                    {isLoading && <CircularProgress className={styles.loadingCircle}/>}
                    <MaterialTable data={tableDataDaily} title="" columns={columns} options={options}/>
                </div>,
            Weekly:
                <div>
                    {isLoading && <CircularProgress className={styles.loadingCircle}/>}
                <MaterialTable data={tableDataWeekly} title="" columns={columns} options={options}/>
                </div>,
            Monthly:
                <div>
                    {isLoading && <CircularProgress className={styles.loadingCircle}/>}
                <MaterialTable data={tableDataMonthly} title="" columns={columns} options={options}/>
                </div>,
            Quarterly:
                <div>
                    {isLoading && <CircularProgress className={styles.loadingCircle}/>}
                <MaterialTable data={tableDataQuarterly} title="" columns={columns} options={options}/>
                </div>,
        }


        function filter(inputValue, path) {
            return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
        }

        return (

            <GridContent className={styles.userCenter}>
                <Row gutter={24}>
                    <Col lg={6} md={12} sm={24}>
                        <Card bordered={false} style={{marginBottom: 24}}>
                            <Form onSubmit={this.handleSubmit} layout="vertical">
                                <Form.Item label={<FormattedMessage id="form.province.label"/>}>
                                    {getFieldDecorator('province', {
                                        rules: [{
                                            required: true,
                                            message: <FormattedMessage id="form.province.placeholder"/>
                                        }],
                                        initialValue: provinceData[0],
                                        onChange: this.handleProvinceChange

                                    })(
                                        <Select
                                        >

                                            {provinceData.map(province => <Option key={province}>{province}</Option>)}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label={<FormattedMessage id="form.city.label"/>}>
                                    {getFieldDecorator('city', {
                                        rules: [{
                                            required: true,
                                            message: <FormattedMessage id="form.city.placeholder"/>,

                                        }],
                                        initialValue: secondCity,
                                        onChange: this.onSecondCityChange,

                                        // getValueFromEvent: this.onSecondCityChange
                                    })(
                                        <Select
                                        >
                                            {cities.map(city => <Option key={city}>{city}</Option>)}

                                        </Select>
                                    )}
                                </Form.Item>

                                <Form.Item label={<FormattedMessage id="form.zone.label"/>}>
                                    {getFieldDecorator('zone', {
                                        rules: [{
                                            required: true,
                                            message: <FormattedMessage id="form.zone.placeholder"/>,

                                        }],
                                        initialValue: fourthZone
                                    })(
                                        <Select
                                            mode="multiple"
                                            style={{width: '100%'}}
                                            onChange={this.onFourthZoneChange}
                                        >
                                            <Option key='all'>全部区域</Option>
                                            {zones.map(zone => <Option key={zone}>{zone}</Option>)}

                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item {...formItemLayout} label={<FormattedMessage id="form.date.label"/>}>
                                    {getFieldDecorator("date", {
                                        rules: [
                                            {
                                                type: 'array',
                                                required: true,
                                                message: formatMessage({id: "validation.date.required"})
                                            }
                                        ],
                                        trigger: 'onPanelChange',
                                        setFieldsValue: {value},
                                    })(
                                        <RangePicker
                                            style={{width: "100%"}}
                                            placeholder={[
                                                formatMessage({id: "form.date.placeholder.start"}),
                                                formatMessage({id: "form.date.placeholder.end"})
                                            ]}
                                            format='YYYY-MM'
                                            mode={mode}
                                            onPanelChange={this.handlePanelChange}
                                        />
                                    )}
                                </Form.Item>

                                <Form.Item {...submitFormLayout} style={{marginTop: 32, marginLeft: 25}}>
                                    <Button type="primary" htmlType="submit" loading={submitting}>
                                        <FormattedMessage id="app.label.search.title"/>
                                    </Button>
                                    <Button style={{marginLeft: 10}} onClick={this.handleFormReset}>
                                        <FormattedMessage id="app.label.reset.title"/>
                                    </Button>
                                </Form.Item>

                            </Form>
                        </Card>
                    </Col>
                    <Col lg={18} md={24}>
                        <Card
                            className={styles.tabsCard}
                            bordered={false}
                            tabList={tabList}
                            activeTabKey={this.state.key}
                            onTabChange={(key) => {
                                this.onTabChange(key, 'key');
                            }}
                        >
                            {contentList[this.state.key]}
                        </Card>
                    </Col>
                </Row>
            </GridContent>
        );
    }
}

export default List_Zone;
