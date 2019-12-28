import React, {PureComponent} from "react";

import {connect} from "dva";
import {
    Row,
    Col,
    Form,
    Select,
    Card,
    Button,

} from "antd";
import {CircularProgress} from '@material-ui/core';
import MaterialTable from 'material-table'
import GridContent from "@/components/PageHeaderWrapper/GridContent";

import dists from '@/utils/distUtil';

const {provinceData, cityData, areaData} = dists;

import {formatMessage, FormattedMessage} from "umi/locale";

import styles from "./Common.less";


const Option = Select.Option;


@connect(({query, loading}) => ({
    query,
    loading: loading.models.query
}))

@Form.create()
class List_Info extends PureComponent {
    state = ({
        mode: ["month", "month"],
        value: [],
        formValues: {},
        tableData: [],
        isLoading: false,
        cities: cityData[provinceData[0]],
        secondCity: cityData[provinceData[0]][0],
        areas: areaData[cityData[provinceData[0]][0]],
        thirdArea: [areaData[cityData[provinceData[0]][0]][0]]
    });


    handleSubmit = (e) => {
        e.preventDefault();

        // console.log(this.props);
        const {dispatch, form} = this.props;


        form.validateFields((err, fieldValue) => {

            // console.log(fieldValue);

            let formValues = {};
            if (err) return;


            // console.log(fieldValue);


            // if (fieldValue.city[1] === "市辖区") {
            //     formValues.city = fieldValue.city[0].replace("市", "");
            //     formValues.districtList = fieldValue.city[2];
            // } else {
            //     formValues.city = fieldValue.city[1];
            //     formValues.districtList = fieldValue.city[2];
            // }

            formValues.city = fieldValue.city;
            const _area_arr = Array.isArray(fieldValue.area)? fieldValue.area : [fieldValue.area]
            formValues.districtList = _area_arr.join(',');
            formValues.star = fieldValue.star;
            // hash tag
            formValues.hash = "#info";

            this.setState({
                formValues: formValues,
                isLoading: true
            });

            //console.log(formValues);
            dispatch({
                type: "query/fetchData",
                payload: formValues,
                callback: () => {
                    const {query: {tableData}} = this.props;

                    this.setState({
                        tableData: tableData,
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
            tableData: []
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
        const {submitting, form: {getFieldDecorator}} = this.props;
        const {
            value, mode, formValues, tableData, isLoading,
            cities,
            areas,
            secondCity,
            thirdArea
        } = this.state;


        const selectChildren = [
            <Option key='1'>1</Option>,
            <Option key='2'>2</Option>,
            <Option key='3'>3</Option>,
            <Option key='4'>4</Option>,
            <Option key='5'>5</Option>
        ];

        const columns = [
            {
                title: formatMessage({id: "app.table.header.hotelname"}),
                field: "hotelName"
            },
            {
                title: formatMessage({id: "app.table.header.star"}),
                field: "star"
            },
            {
                title: formatMessage({id: "app.table.header.group"}),
                field: "group_cn"
            },
            {
                title: formatMessage({id: "app.table.header.roomnum"}),
                field: "house_num"
            },
            {
                title: formatMessage({id: "app.table.header.city"}),
                field: "city"
            },
            {
                title: formatMessage({id: "app.table.header.district"}),
                field: "district"
            },
            {
                title: formatMessage({id: "app.table.header.zone"}),
                field: "zone"
            },
            {
                title: formatMessage({id: "app.table.header.addr"}),
                field: "address"
            },
            {
                title: formatMessage({id: "app.table.header.opend"}),
                field: "open_time"
            },
            {
                title: formatMessage({id: "app.table.header.decorated"}),
                field: "deco_time"
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
                                <Form.Item label={<FormattedMessage id="form.star.label"/>}>
                                    {getFieldDecorator("star", {
                                        rules: [{required: true, message: ""}],
                                        initialValue: "5"
                                    })(
                                        <Select
                                            mode="multiple"
                                            style={{width: "100%"}}
                                            placeholder={<FormattedMessage id="form.star.placeholder"/>}

                                        >
                                            {selectChildren}
                                        </Select>
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
                            bordered={false}
                        >
                            {isLoading && <CircularProgress className={styles.loadingCircle}/>}
                            <MaterialTable columns={columns} title='' data={tableData} options={options}/>
                        </Card>
                    </Col>
                </Row>
            </GridContent>
        );
    }
}

export default List_Info;
