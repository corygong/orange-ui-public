import React, {Component, PureComponent, Suspense} from 'react';
import {connect} from 'dva';
import {Row, Col, Icon, Menu, Dropdown, Form, Select, Button, Collapse, Radio, DatePicker, Card, Tabs, Descriptions} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import {getTimeDistance} from '@/utils/utils';
import styles from './Index.less';
import PageLoading from '@/components/PageLoading';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment'

const CustomChart = React.lazy(() => import('./components/CustomBarCharts'));

import {FormattedMessage, formatMessage} from 'umi/locale';
import CustomBarCharts from "./components/CustomBarCharts";

const {Panel} = Collapse;

const {TabPane} = Tabs;


const colStyles = {
    flexBasis: "33%",
    // outline: "1px solid red",
    width: "33%",
      marginBottom: 24,
      marginTop:12
  };

class Index extends PureComponent {
    // state = {
    //     chartComponent :<div></div>,
    //     chart_name :'',
    //     chart_data :[],
    //     chart_loading: true,
    //     stat_disc: "",
    //     stat_datasource :"",
    //     stat_otherinfo: ""
    // };
    //
    // componentWillMount() {
    //     const {dispatch} = this.props;
    //
    //
    //
    //     if(dispatch.location.hash == "") {
    //         console.log(this.props)
    //     } else {
    //         this.setState({
    //             chart_name: dispatch.location.hash
    //         })
    //
    //         dispatch({
    //             type: 'stat/fetchStatisticInfo',
    //             payload: dispatch.location.hash,
    //             callback: () => {
    //
    //                 const {stat: {data}} = this.props;
    //
    //                 this.setState({
    //                     chart_data: data,
    //                     chart_loading: false
    //                 })
    //
    //             }
    //         })
    //     }
    //
    //
    //
    //
    //
    // }
    //
    //
    // renderTable(chart_title, ) {
    //
    //    return <CustomBarCharts title={} tag={} data={}/>
    //
    //
    // }
    //
    // renderLineChart() {
    //
    // }
    //
    // renderBarChart() {
    //
    // }
    //
    //
    //
    // render() {
    //     const {
    //         chartComponent, stat_disc,stat_datasource,stat_otherinfo
    //     } = this.state;
    //     return (
    //     <PageHeaderWrapper title="">
    //         <GridContent>
    //
    //             <Row gutter={24}>
    //                 <Col span={16} >
    //
    //                     {chartComponent}
    //
    //
    //                 </Col>
    //                 <Col span={8} >
    //                     <Row gutter={16} type="flex">
    //                         <Collapse defaultActiveKey={['1', '2', '3', '4']}>
    //                             <Panel key="1" header={<FormattedMessage id="app.statistics.download"/>}>
    //                                 <Row gutter={16} type="flex">
    //                                     <Col span={8}><Button type="primary">PNG</Button></Col>
    //                                     <Col span={8}><Button type="primary">PDF</Button></Col>
    //                                     <Col span={8}><Button type="primary">XLS</Button></Col>
    //                                 </Row>
    //
    //                             </Panel>
    //
    //                             <Panel key="2" header={<FormattedMessage id="app.statistics.description"/>}>
    //
    //                                 {stat_disc}
    //                             </Panel>
    //
    //                              <Panel key="3" header={<FormattedMessage id="app.statistics.source"/>}>
    //
    //                                 {stat_datasource}
    //                             </Panel>
    //
    //                             <Panel key="4" header={<FormattedMessage id="app.statistics.otherinfo"/>}>
    //
    //                                 {stat_otherinfo}
    //                             </Panel>
    //                         </Collapse>
    //
    //
    //
    //
    //                     </Row>
    //
    //
    //                 </Col>
    //
    //             </Row>
    //         </GridContent>
    //
    //     </PageHeaderWrapper>
    //
    //     )
    // }
}

export default Index;
