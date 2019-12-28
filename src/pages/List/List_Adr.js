import React, {PureComponent} from 'react';

import {connect} from 'dva';
import {formatMessage, FormattedMessage} from 'umi/locale';

import {
    Row,
    Col,
    Form,
    Select,
    Card,
    DatePicker,
    Button
} from 'antd';


import {CircularProgress} from '@material-ui/core';
import MaterialTable from 'material-table';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import dists from '@/utils/distUtil';

const {provinceData, cityData, areaData} = dists;


import styles from './Common.less';

const {RangePicker} = DatePicker;

const {Option} = Select;


//
// console.log(provinceData)
// console.log(cityData)
// console.log(areaData)

@connect(({query, loading}) => ({
    query,
    loading: loading.models.query,
}))


@Form.create({
    onValuesChange({dispatch}, changedValues, allValues) {
        // 表单项变化时请求数据
        // eslint-disable-next-line
        // console.log(changedValues, allValues);
        // 模拟查询表单生效
        // dispatch({
        //   type: 'list/fetch',
        //   payload: {
        //     count: 8,
        //   },
        // });
    },
})
class List_Adr extends PureComponent {


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
        thirdArea: [areaData[cityData[provinceData[0]][0]][0]]


    })

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
            if (err) return;

            const start = fieldValue.date[0].format("MM/YYYY");
            const end = fieldValue.date[1].format("MM/YYYY");
            let formValues = {}
            formValues['start'] = start;
            formValues['end'] = end;


            formValues['city'] = fieldValue.city;


            const _area_arr = Array.isArray(fieldValue.area)? fieldValue.area : [fieldValue.area]
            formValues['districtList'] = _area_arr.join(',');
            // console.log(formValues)

            formValues['star'] = fieldValue.star;
            // hash tag
            formValues['hash'] = '#adr';


            this.setState({
                formValues: formValues,
                isLoading: true
            })

            console.log(this.state.isLoading)

            // console.log(formValues);
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
            //}

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
            area: areaData[cityData[value][0]][0]
        })


        this.setState({
            cities: cityData[value],
            secondCity: cityData[value][0],

            areas: areaData[cityData[value][0]],
            thirdArea: [areaData[cityData[value][0]][0]]
        });



    }
    onSecondCityChange = (value) => {

        // this.props.form.setFieldsValue({
        //     secondCity :value,
        //     areas: areaData[value],
        //     thirdArea: areaData[value][0]
        // })
        this.props.form.setFieldsValue({
            area: areaData[value][0]
        })

        this.setState({
            secondCity: value,
            areas: areaData[value],
            thirdArea: [areaData[value][0]]
        })
    }
    //
    onAreaChange = (value) => {

        // this.setState({
        //     thirdArea: value
        // })

        const {areas} = this.state;
        // console.log(this.state, value)

        if (value.includes('all')) {
            this.setState({
                thirdArea: areas
            })
            setTimeout(() => {
                    this.props.form.setFieldsValue({
                        area: areas
                    })
                }

                , 0)


        } else {
            this.setState({
                thirdArea: value
            })
        }


    }

    render() {

        const {
            value, mode,
            tableDataDaily, tableDataWeekly,
            tableDataMonthly,
            tableDataQuarterly,
            formValues,
            isLoading,
            cities,
            areas,
            secondCity,
            thirdArea
        } = this.state;

        // console.log(this.state)
        const {submitting} = this.props;


        const selectChildren = [
            <Option key='1'>1</Option>,
            <Option key='2'>2</Option>,
            <Option key='3'>3</Option>,
            <Option key='4'>4</Option>,
            <Option key='5'>5</Option>,
        ];

        const {
            form: {getFieldDecorator},
            loading,
        } = this.props;


        const columns = [
            {
                title: formatMessage({id: "app.table.header.hotelname"}),
                field: 'hotelName',
            },
            {
                title: formatMessage({id: "app.table.header.date"}),
                field: 'date',
            },
            {
                title: formatMessage({id: "app.table.header.star"}),
                field: 'star',
            },
            {
                title: formatMessage({id: "app.table.header.district"}),
                field: 'district',
            },
            {
                title: formatMessage({id: "app.table.header.zone"}),
                field: 'zone',
            },
            {
                title: formatMessage({id: "app.table.header.adr"}),
                field: 'adr',
            },
        ];

        const options = {
            columnsButton: true,
            exportButton: true
        }


        const tabList = [
            {
                key: 'Daily',
                tab:
                    <div style={{fontSize: 14}}>
                        <FormattedMessage id="app.table.tab.daily.title" defaultMessage="Daily"/>
                    </div>,

            }, {
                key: 'Weekly',
                tab:
                    <div style={{fontSize: 14}}>
                        <FormattedMessage id="app.table.tab.weekly.title" defaultMessage="Weekly"/>
                    </div>,

            }, {
                key: 'Monthly',
                tab:
                    <div style={{fontSize: 14}}>
                        <FormattedMessage id="app.table.tab.monthly.title" defaultMessage="Monthly"/>
                    </div>,

            }, {
                key: 'Quarterly',
                tab:
                    <div style={{fontSize: 14}}>
                        <FormattedMessage id="app.table.tab.quarterly.title" defaultMessage="Quarterly"/>
                    </div>,

            },
        ];

        // console.log(tableDataDaily)
        // let contentList = {
        //   Daily: <Table loading={loading} rowKey={record => record.uid} dataSource={tableDataDaily} columns={this.columns} />,
        //   Weekly: <Table loading={loading} rowKey={record => record.uid} dataSource={tableDataWeekly} columns={this.columns} onChange={this.handleStandardTableChange}/>,
        //   Monthly:<Table loading={loading} rowKey={record => record.uid} dataSource={tableDataMonthly} columns={this.columns} onChange={this.handleStandardTableChange}/>,
        //   Quarterly:<Table loading={loading} rowKey={record => record.uid} dataSource={tableDataQuarterly} columns={this.columns} onChange={this.handleStandardTableChange}/>,
        // }
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

                                <Form.Item label={<FormattedMessage id="form.area.label"/>}>
                                    {getFieldDecorator('area', {
                                        rules: [{
                                            required: true,
                                            message: <FormattedMessage id="form.area.placeholder"/>
                                        }],
                                        initialValue: thirdArea,

                                    })(
                                        <Select
                                            mode="multiple"
                                            style={{width: '100%'}}
                                            onChange={this.onAreaChange}
                                        >
                                            <Option key='all'>全部区域</Option>
                                            {areas.map(area => <Option key={area}>{area}</Option>)}
                                        </Select>
                                    )}
                                </Form.Item>

                                <Form.Item label={<FormattedMessage id="form.date.label"/>}>
                                    {getFieldDecorator('date', {
                                        rules: [
                                            {
                                                type: 'array',
                                                required: true,
                                                message: formatMessage({id: 'validation.date.required'}),

                                            },
                                        ],
                                        trigger: 'onPanelChange',
                                        setFieldsValue: {value},
                                    })(
                                        <RangePicker
                                            style={{width: '100%'}}
                                            placeholder={[
                                                formatMessage({id: 'form.date.placeholder.start'}),
                                                formatMessage({id: 'form.date.placeholder.end'}),
                                            ]}
                                            format='YYYY-MM'
                                            mode={mode}
                                            onPanelChange={this.handlePanelChange}

                                        />,
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
                                            {selectChildren}
                                        </Select>,
                                    )}
                                </Form.Item>
                                <Form.Item style={{marginTop: 32, marginLeft: 25}}>
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
                            size="small"
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

export default List_Adr;
