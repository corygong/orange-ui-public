import React, {PureComponent} from "react";

import {connect} from "dva";
import {
    Row,
    Col,
    Form,
    Select,
    Card,
    DatePicker,
    Table,
    Button
} from "antd";
import MaterialTable from 'material-table';
import GridContent from "@/components/PageHeaderWrapper/GridContent";


import dists from '@/utils/distUtil';

const {provinceData, cityData, areaData} = dists;

import {formatMessage, FormattedMessage} from "umi/locale";

import styles from "./Common.less";
import {CircularProgress} from "@material-ui/core";

const {RangePicker} = DatePicker;

const {Option} = Select;


@connect(({query, loading}) => ({
    query,
    loading: loading.models.query
}))

@Form.create()
class List_Vacancy extends PureComponent {
    state = {
        mode: ["year", "year"],
        value: [],
        formValues: {},
        tables: [],
        key: "Daily",
        isLoading: false,
        cities: cityData[provinceData[0]],
        secondCity: cityData[provinceData[0]][0],
        areas: areaData[cityData[provinceData[0]][0]],
        thirdArea: [areaData[cityData[provinceData[0]][0]][0]]
    };


    handlePanelChange = (value, mode) => {
        this.setState({
            value,
            // mode: [
            //   mode[0] === "date" ? "year" : mode[0],
            //   mode[1] === "date" ? "year" : mode[1]
            // ]
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        // console.log(this.props);
        const {dispatch, form} = this.props;


        form.validateFields((err, fieldValue) => {

            let formValues = {};
            if (err) return;


            const start = fieldValue.date[0].format("YYYY");
            const end = fieldValue.date[1].format("YYYY");
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

            const _area_arr = Array.isArray(fieldValue.area)? fieldValue.area : [fieldValue.area]
            formValues.districtList = _area_arr.join(',');
            formValues.hash = "#vacancy";

            this.setState({
                formValues: formValues,
                isLoading: true
            });

            // console.log(formValues);
            dispatch({
                type: "query/fetchData",
                payload: formValues,
                callback: () => {
                    const {query: {tableData}} = this.props;
                    const {DATA} = tableData;
                    this.setState({
                        tables: DATA,
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
            tables: []
        });
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
            thirdArea: areaData[cityData[value][0]][0]
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
            thirdArea: areaData[value][0]
        })
    }
    //
    onAreaChange = (value) => {

        if (value.includes('all')) {
            this.setState({
                thirdArea: areaData[cityData[provinceData[0]][0]]
            })
            setTimeout(() => {
                    this.props.form.setFieldsValue({
                        area: areaData[cityData[provinceData[0]][0]]
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
            value,
            mode,
            tables,
            isLoading,
            cities,
            areas,
            secondCity,
            thirdArea
        } = this.state;
        const {
            submitting,
            form
        } = this.props;

        const {getFieldDecorator} = form;

        const columns = [
            {
                title: formatMessage({id: "app.table.header.city"}),
                field: "city",

            },
            {
                title: formatMessage({id: "app.table.header.date"}),
                field: "date"
            },
            {
                title: formatMessage({id: "app.table.header.star"}),
                field: "star",

            },
            {
                title: formatMessage({id: "app.table.header.vacancy"}),
                field: "rate"
            }
        ];

        const options = {
            columnsButton: true,
            exportButton: true
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
                                        initialValue: thirdArea
                                    })(
                                        <Select
                                            mode="multiple"
                                            style={{width: '100%'}}
                                            placeholder={<FormattedMessage id="form.area.placeholder"/>}
                                            onChange={this.onAreaChange}
                                        >
                                            <Option key='all'>全部区域</Option>
                                            {areas.map(area => <Option key={area}>{area}</Option>)}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label={<FormattedMessage id="form.date.label"/>}>
                                    {getFieldDecorator("date", {
                                        rules: [
                                            {
                                                type: "array",
                                                required: true,
                                                message: formatMessage({id: "validation.date.required"})

                                            }
                                        ],
                                        trigger: "onPanelChange",
                                        setFieldsValue: value
                                    })(
                                        <RangePicker
                                            style={{width: "100%"}}
                                            format="YYYY"
                                            placeholder={[
                                                formatMessage({id: "form.date.placeholder.start"}),
                                                formatMessage({id: "form.date.placeholder.end"})
                                            ]}
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
                            bordered={false}
                        >
                            {isLoading && <CircularProgress className={styles.loadingCircle}/>}
                            <MaterialTable columns={columns} data={tables} title="" options={options}/>
                            />
                        </Card>
                    </Col>
                </Row>
            </GridContent>
        );
    }
}

export default List_Vacancy;
