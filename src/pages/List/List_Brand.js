import React, {PureComponent} from "react";

import {connect} from "dva";
import {
    Row,
    Col,
    Form,
    Select,
    Card,
    DatePicker,
    Button,
} from "antd";
import {CircularProgress} from '@material-ui/core';
import MaterialTable from 'material-table'

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
class List_Brand extends PureComponent {

    state = ({
        mode: ['month', 'month'],
        value: [],
        formValues: {},
        tableDataDaily: [],
        tableDataWeekly: [],
        tableDataMonthly: [],
        tableDataQuarterly: [],
        key: 'Daily',
        isLoading: false,
        cities: cityData[provinceData[0]],
        secondCity: cityData[provinceData[0]][0],
        areas: areaData[cityData[provinceData[0]][0]],
        thirdArea: areaData[cityData[provinceData[0]][0]][1],
        brands: [],
        fourthBrand: ''
    })

    componentWillMount() {

        const {dispatch} = this.props;
        dispatch({
            type: 'query/fetchBrandsByCity',
            payload: {
                city: cityData[provinceData[0]][0]
            },
            callback: () => {
                const {query} = this.props;


                console.log(query)

                const {brands: {brand_list}} = query


                console.log(brand_list)

                this.setState({
                    brands: brand_list,
                    fourthBrand: [brand_list[0]]

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
                mode[0] === 'date' ? 'month' : mode[0],
                mode[1] === 'date' ? 'month' : mode[1],
            ],
        });
    };


    handleSubmit = (e) => {
        e.preventDefault();

        // console.log(this.props);
        const {dispatch, form} = this.props;


        form.validateFields((err, fieldValue) => {

            // console.log(fieldValue);

            let formValues = {}
            if (err) return;

            // console.log(fieldValue.date[0].format("YYYY/MM"));


            const start = fieldValue.date[0].format("MM/YYYY");
            const end = fieldValue.date[1].format("MM/YYYY");

            // console.log()

            formValues.start = start;
            formValues.end = end;

            const _brand_arr = Array.isArray(fieldValue.brand) ? fieldValue.brand : [fieldValue.brand]

            formValues.brand = _brand_arr.join(',')
            // formValues.city = fieldValue.city;

            // if (fieldValue.city[1] === '市辖区') {
            //     formValues.city = fieldValue.city[0].replace('市', '');
            //     formValues.districtList = fieldValue.city[2];
            // } else {
            //     formValues.city = fieldValue.city[1];
            //     formValues.districtList = fieldValue.city[2];
            // }

            formValues.city = fieldValue.city;
            // hash tag
            formValues.hash = '#brand';

            this.setState({
                formValues: formValues,
            })

            this.setState({
                isLoading: true
            })

            //console.log(formValues);
            dispatch({
                type: 'query/fetchData',
                payload: formValues,
                callback: () => {
                    const {query: {tableData}} = this.props;
                    const {DAY, WEEK, MONTH, QUARTER} = tableData

                    this.setState({
                        tableDataDaily: DAY,
                        tableDataWeekly: WEEK,
                        tableDataMonthly: MONTH,
                        tableDataQuarterly: QUARTER,
                        isLoading: false
                    })


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
            city: cityData[value][0],
        })


        this.setState({
            cities: cityData[value],
            secondCity: cityData[value][0],
        });

        //
        const {dispatch} = this.props;
        dispatch({
            type: 'query/fetchBrandsByCity',
            payload: {
                city: cityData[value][0]
            },
            callback: () => {
                const {query} = this.props;

                const {brands} = query

                const {brand_list} = brands

                this.setState({
                    brands: brand_list,
                    fourthBrand: [brand_list[0]]

                })

                this.props.form.setFieldsValue({
                    brand: brand_list[0]
                })
            }
        })

    }
    onSecondCityChange = (value) => {


        this.setState({
            secondCity: value,
        })
        const {dispatch} = this.props;
        dispatch({
            type: 'query/fetchBrandsByCity',
            payload: {
                city: value
            },
            callback: () => {
                const {query} = this.props;

                const {brands} = query

                const {brand_list} = brands


                this.setState({
                    brands: brand_list,
                    fourthBrand: brand_list[0]
                })
                this.props.form.setFieldsValue({
                    brand: brand_list[0]
                })
            }
        })
    }


    onFourthBrandChange = (value) => {

        const {brands} = this.state;
        if (value.includes('all')) {
            this.setState({
                fourthBrand: brands
            })
            setTimeout(() => {
                    this.props.form.setFieldsValue({
                        brand: brands
                    })
                }

                , 0)


        } else {
            this.setState({
                fourthBrand: value
            })
        }
        // this.setState({
        //     fourthBrand: value
        // })
    }

    render() {

        //console.log(this.state)
        const {submitting, form} = this.props;

        const {
            mode, value, tableDataDaily, tableDataWeekly, tableDataMonthly, tableDataQuarterly, formValues,
            isLoading,
            cities,
            areas,
            brands,
            secondCity,
            thirdArea,
            fourthBrand
        } = this.state;

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
                tab: <div style={{fontSize: 14}}>
                    <FormattedMessage id="app.table.tab.quarterly.title" defaultMessage="Quarterly"/>
                </div>
            }
        ];

        const columns = [
            {
                title: formatMessage({id: "app.table.header.brand"}),
                field: "brand"
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
            Daily: <div>
                {isLoading && <CircularProgress className={styles.loadingCircle}/>}
                <MaterialTable data={tableDataDaily} title='' columns={columns} options={options}/>
            </div>,
            Weekly:
                <div>
                    {isLoading && <CircularProgress className={styles.loadingCircle}/>}
                    <MaterialTable data={tableDataWeekly} title='' columns={columns} title="" options={options}/>
                </div>,
            Monthly:
                <div>
                    {isLoading && <CircularProgress className={styles.loadingCircle}/>}
                    <MaterialTable data={tableDataMonthly} title='' columns={columns} title="" options={options}/>
                </div>,
            Quarterly:
                <div>
                    {isLoading && <CircularProgress className={styles.loadingCircle}/>}
                    <MaterialTable data={tableDataQuarterly} title='' columns={columns} title="" options={options}/>
                </div>
        };

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

                                <Form.Item label={<FormattedMessage id="form.brand.label"/>}>
                                    {getFieldDecorator('brand', {
                                        rules: [{
                                            required: true,
                                            message: <FormattedMessage id="form.brand.placeholder"/>,

                                        }],
                                        initialValue: fourthBrand
                                    })(
                                        <Select
                                            mode="multiple"
                                            style={{width: '100%'}}
                                            onChange={this.onFourthBrandChange}

                                        >
                                            <Option key='all'>全部品牌</Option>
                                            {brands.map(brand => <Option key={brand}>{brand}</Option>)}

                                        </Select>
                                    )}
                                </Form.Item>

                                <Form.Item label={<FormattedMessage id="form.date.label"/>}>
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
                                <Form.Item style={{marginTop: 32, marginLeft: 25}}>
                                    <Button type="primary" htmlType="submit" loading={submitting}>
                                        <FormattedMessage id="app.label.search.title"/>
                                    </Button>
                                    <Button style={{marginLeft: 10}}>
                                        <FormattedMessage id="app.label.reset.title"/>
                                    </Button>
                                </Form.Item>

                            </Form>
                        </Card>
                    </Col>
                    <Col lg={18} md={24}>
                        <Card
                            size="small"
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

export default List_Brand;
