import React, {PureComponent} from 'react';
import {connect} from "dva";
import {Button, Card, Select, Form, Radio} from 'antd';
import {FormattedMessage} from 'umi/locale';



import dists from '@/utils/distUtil';

const {provinceData, cityData} = dists;


@Form.create({
    onValuesChange({dispatch}, changedValues, allValues) {
    },
})
class CustomForm extends PureComponent {
    state = {

        currentTabKey: '',
        distData: [],
        cities: cityData[provinceData[0]],
        cityValue: cityData[provinceData[0]][0],
        radioValue: 1
    };


    componentWillUpdate() {

    }

    onProvinceChange = (value) => {

        this.props.form.setFieldsValue({
            city: cityData[value][0]
        })


        this.setState({
            cities: cityData[value],
            cityValue: cityData[value][0]
        });


    }

    onCityChange = (value) => {

        // this.props.form.setFieldsValue({
        //     secondCity :value,
        //     areas: areaData[value],
        //     thirdArea: areaData[value][0]
        // })


        this.setState({
            cityValue: value
        })
    }

    onRadioChange = (e) => {
        console.log(e)
        this.setState({
            radioValue: e.target.value,
        });

    }

    render() {

        const {title, form: {getFieldDecorator}} = this.props;
        const {rangePickerValue, salesType, currentTabKey} = this.state;


        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>

                <Form.Item label={<FormattedMessage id="form.province.label"/>}>
                    {getFieldDecorator('city', {
                        rules: [{
                            required: true,
                            message: <FormattedMessage id="form.province.placeholder"/>
                        }],
                        initialValue: 0,
                        onChange: this.handleProvinceChange

                    })(
                        <Select
                        >
                            {/*{provinceData.map(province => <Option key={province}>{province}</Option>)}*/}
                        </Select>
                    )}
                </Form.Item>

                <Form.Item label={<FormattedMessage id="form.date.radio"/>}>
                    {getFieldDecorator('date1', {

                        initialValue: 1,
                        onChange: this.onRadioChange

                    })(
                        <Radio.Group>
                            <Radio value={1}>{<FormattedMessage id="form.date.yearly"/>}</Radio>
                            <Radio value={2}>{<FormattedMessage id="form.date.quarterly"/>}</Radio>
                            <Radio value={3}>{<FormattedMessage id="form.date.monthly"/>}</Radio>
                        </Radio.Group>
                    )}


                </Form.Item>
                <Form.Item label={<FormattedMessage id="form.date.label"/>}>
                    {getFieldDecorator('province', {
                        rules: [{
                            required: true,
                            message: <FormattedMessage id="form.province.placeholder"/>
                        }],
                        initialValue: 0,
                        onChange: this.handleProvinceChange

                    })(
                        <Select
                        >
                            {/*{provinceData.map(province => <Option key={province}>{province}</Option>)}*/}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label={<FormattedMessage id="form.star.label"/>}>
                    {getFieldDecorator('province', {
                        rules: [{
                            required: true,
                            message: <FormattedMessage id="form.province.placeholder"/>
                        }],
                        initialValue: 0,
                        onChange: this.handleProvinceChange

                    })(
                        <Select
                        >
                            {/*{provinceData.map(province => <Option key={province}>{province}</Option>)}*/}
                        </Select>
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
        )
    }


}

export default CustomForm
