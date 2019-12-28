import React, {memo} from 'react';
import {Row, Col, Icon, Tooltip, Form, Select} from 'antd';
import {FormattedMessage, formatMessage} from 'umi-plugin-react/locale';
import numeral from 'numeral';
import styles from './Index.less';
import {ChartCard, MiniArea, MiniBar, MiniProgress, Field} from '@/components/Charts';
import Trend from '@/components/Trend';

// const topColResponsiveProps0 = {
//     xs: 24,
//     sm: 12,
//     md: 12,
//     lg: 12,
//     xl: 12,
//     style: {marginBottom: 24, marginTop: 12},
// };

// const topColResponsiveProps1 = {
//     xs: 24,
//     sm: 12,
//     md: 12,
//     lg: 12,
//     xl: 8,
//     style: {marginBottom: 24},
// };

const topColResponsiveProps2 = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: {marginBottom: 24},
};

const colStyles = {
  flexBasis: "20%",
  // outline: "1px solid red",
  width: "20%",
    marginBottom: 24,
    marginTop:12
};

const BasicMetric = memo(({loading, data}) => (
    <div>

        <Row gutter={16} type="flex">
            <Col style={{...colStyles}}>
                <ChartCard
                    bordered={true}
                    title={<FormattedMessage id="app.dashboard.total-hotel-num" defaultMessage="Total Sales"/>}

                    loading={loading}
                    total={() => <div>{data['totel_hotel_num']}</div>}
                    contentHeight={46}
                >
                    {/*<Trend flag="up" style={{marginRight: 16}}>*/}
                        {/*<FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes"/>*/}
                        {/*<span className={styles.trendText}>12%</span>*/}
                    {/*</Trend>*/}
                    {/*<Trend flag="down">*/}
                        {/*<FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes"/>*/}
                        {/*<span className={styles.trendText}>11%</span>*/}
                    {/*</Trend>*/}
                </ChartCard>
            </Col>

            <Col style={{...colStyles}}>
                <ChartCard
                    bordered={true}
                    loading={loading}
                    title={<FormattedMessage id="app.dashboard.total-room-num" defaultMessage="Total Rooms"/>}
                    // action={
                    //     <Tooltip
                    //         title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>}
                    //     >
                    //         <Icon type="info-circle-o"/>
                    //     </Tooltip>
                    // }
                    total={data['totel_room_num']}
                    // footer={
                    //     <Field
                    //         label={<FormattedMessage id="app.analysis.day-visits" defaultMessage="Daily Visits"/>}
                    //         value={numeral(1234).format('0,0')}
                    //     />
                    // }
                    contentHeight={46}
                >

                </ChartCard>
            </Col>
            <Col style={{...colStyles}}>
                <ChartCard
                    bordered={true}
                    loading={loading}
                    title={<FormattedMessage id="app.dashboard.adr" defaultMessage="ADR"/>}
                    // action={
                    //     <Tooltip
                    //         title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>}
                    //     >
                    //         <Icon type="info-circle-o"/>
                    //     </Tooltip>
                    // }
                    total={data['adr']}
                    // footer={
                    //     <Field
                    //         label={
                    //             <FormattedMessage
                    //                 id="app.analysis.conversion-rate"
                    //                 defaultMessage="Conversion Rate"
                    //             />
                    //         }
                    //         value="60%"
                    //     />
                    // }
                    contentHeight={46}
                >

                </ChartCard>
            </Col>
             <Col style={{...colStyles}}>
                <ChartCard
                    bordered={true}
                    title={
                        <FormattedMessage
                            id="app.dashboard.vancancy"
                            defaultMessage="Operational Effect"
                        />
                    }
                    // action={
                    //     <Tooltip
                    //         title={<FormattedMessage id="app.dashboard.vancancy" defaultMessage="Vancancy"/>}
                    //     >
                    //         <Icon type="info-circle-o"/>
                    //     </Tooltip>
                    // }
                    total={data['vacancy']}
                    // footer={
                    //     <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                    //         <Trend flag="up" style={{marginRight: 16}}>
                    //             <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes"/>
                    //             <span className={styles.trendText}>12%</span>
                    //         </Trend>
                    //         <Trend flag="down">
                    //             <FormattedMessage id="app.analysis.day" defaultMessage="Weekly Changes"/>
                    //             <span className={styles.trendText}>11%</span>
                    //         </Trend>
                    //     </div>
                    // }
                    contentHeight={46}
                >
                </ChartCard>
            </Col>
            <Col style={{...colStyles}}>
                <ChartCard
                    bordered={true}
                    title={
                        <FormattedMessage
                            id="app.dashboard.ravpar"
                            defaultMessage="Operational Effect"
                        />
                    }
                    // action={
                    //     <Tooltip
                    //         title={<FormattedMessage id="app.dashboard.vancancy" defaultMessage="Vancancy"/>}
                    //     >
                    //         <Icon type="info-circle-o"/>
                    //     </Tooltip>
                    // }
                    total={data['vacancy']}
                    // footer={
                    //     <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                    //         <Trend flag="up" style={{marginRight: 16}}>
                    //             <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes"/>
                    //             <span className={styles.trendText}>12%</span>
                    //         </Trend>
                    //         <Trend flag="down">
                    //             <FormattedMessage id="app.analysis.day" defaultMessage="Weekly Changes"/>
                    //             <span className={styles.trendText}>11%</span>
                    //         </Trend>
                    //     </div>
                    // }
                    contentHeight={46}
                >
                </ChartCard>
            </Col>


        </Row>
        <Row gutter={24}>
            <Col {...topColResponsiveProps2}>
                <ChartCard
                    bordered={true}
                    title={<FormattedMessage id="app.dashboard.yoy-adr" defaultMessage="Total Sales"/>}
                    // action={
                    //     <Tooltip
                    //         title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>}
                    //     >
                    //         <Icon type="info-circle-o"/>
                    //     </Tooltip>
                    // }
                    loading={loading}
                    total={data['yoy']}
                    // footer={
                    //     <Field
                    //         label={<FormattedMessage id="app.analysis.day-sales" defaultMessage="Daily Sales"/>}
                    //         value={`￥${numeral(12423).format('0,0')}`}
                    //     />
                    // }
                    contentHeight={46}
                >

                </ChartCard>
            </Col>

            <Col {...topColResponsiveProps2}>
                <ChartCard
                    bordered={true}
                    loading={loading}
                    title={<FormattedMessage id="app.dashboard.chain-adr" defaultMessage="Visits"/>}
                    // action={
                    //     <Tooltip
                    //         title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>}
                    //     >
                    //         <Icon type="info-circle-o"/>
                    //     </Tooltip>
                    // }
                    total={data['chain']}
                    // footer={
                    //     <Field
                    //         label={<FormattedMessage id="app.analysis.day-visits" defaultMessage="Daily Visits"/>}
                    //         value={numeral(1234).format('0,0')}
                    //     />
                    // }
                    contentHeight={46}
                >

                </ChartCard>
            </Col>
            <Col {...topColResponsiveProps2}>
                <ChartCard
                    bordered={true}
                    loading={loading}
                    title={<FormattedMessage id="app.dashboard.yoy-hotel-num" defaultMessage="Payments"/>}
                    // action={
                    //     <Tooltip
                    //         title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>}
                    //     >
                    //         <Icon type="info-circle-o"/>
                    //     </Tooltip>
                    // }
                    total={data['yoy_hotel_num']}
                    // footer={
                    //     <Field
                    //         label={
                    //             <FormattedMessage
                    //                 id="app.analysis.conversion-rate"
                    //                 defaultMessage="Conversion Rate"
                    //             />
                    //         }
                    //         value="60%"
                    //     />
                    // }
                    contentHeight={46}
                >

                </ChartCard>
            </Col>
            <Col {...topColResponsiveProps2}>
                <ChartCard
                    loading={loading}
                    bordered={true}
                    title={
                        <FormattedMessage
                            id="app.dashboard.yoy-room-num"
                            defaultMessage="Operational Effect"
                        />
                    }
                    // action={
                    //     <Tooltip
                    //         title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>}
                    //     >
                    //         <Icon type="info-circle-o"/>
                    //     </Tooltip>
                    // }
                    total={data['yoy_room_num']}
                    // footer={
                    //     <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                    //         <Trend flag="up" style={{marginRight: 16}}>
                    //             <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes"/>
                    //             <span className={styles.trendText}>12%</span>
                    //         </Trend>
                    //         <Trend flag="down">
                    //             <FormattedMessage id="app.analysis.day" defaultMessage="Weekly Changes"/>
                    //             <span className={styles.trendText}>11%</span>
                    //         </Trend>
                    //     </div>
                    // }
                    contentHeight={46}
                >
                </ChartCard>
            </Col>
        </Row>
    </div>
));

export default BasicMetric;
