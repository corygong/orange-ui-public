import React, {memo} from 'react';
import {Row, Col, Icon, Tooltip, Form, Select, Card} from 'antd';
import {FormattedMessage, formatMessage} from 'umi-plugin-react/locale';
import numeral from 'numeral';
import styles from './Index.less';
import {ChartCard, MiniArea, MiniBar, MiniProgress, Field} from '@/components/Charts';
import Trend from '@/components/Trend';
import Metric from '@/components/Common/Metric';
import { Bar } from '@/components/Charts';

const topColResponsiveProps = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 12
};

const HotelAnalysis = memo(({loading, visitData}) => (
    <div>

        <Row gutter={24}>
            <Col {...topColResponsiveProps}>
                <Card title="ddd" loading={loading} style={{marginTop:24}}>
                    <Bar
                    height={295}
                    title=""
                    data={visitData}
                    />
                  </Card>
            </Col>
            <Col {...topColResponsiveProps}>
                <Card title="ddd" loading={loading} style={{marginTop:24}}>
                    <Bar
                    height={295}
                    title=""
                    data={visitData}
                    />
                  </Card>
            </Col>
        
        </Row>
        <Row gutter={24}>
            <Col {...topColResponsiveProps}>
                <Card title="ddd" loading={loading} style={{marginTop:24}}>
                    <Bar
                    height={295}
                    title=""
                    data={visitData}
                    />
                  </Card>
            </Col>
            <Col {...topColResponsiveProps}>
                <Card title="ddd" loading={loading} style={{marginTop:24}}>
                    <Bar
                    height={295}
                    title=""
                    data={visitData}
                    />
                  </Card>
            </Col>
        
        </Row>
        <Row gutter={24}>
            <Col {...topColResponsiveProps}>
                <Card title="ddd" loading={loading} style={{marginTop:24}}>
                    <Bar
                    height={295}
                    title=""
                    data={visitData}
                    />
                  </Card>
            </Col>
            <Col {...topColResponsiveProps}>
                <Card title="ddd" loading={loading} style={{marginTop:24}}>
                    <Bar
                    height={295}
                    title=""
                    data={visitData}
                    />
                  </Card>
            </Col>
        
        </Row>
    </div>
));

export default HotelAnalysis;
