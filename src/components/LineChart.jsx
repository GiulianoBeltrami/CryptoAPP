import React from 'react';
import {Link} from 'react-chartjs-2';
import {Col,Row,Typography} from 'antd';

const {Title} = Typography;

const LineChart = ({coinHistory, currentPrice, coinName}) => {
    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} Gráfico de preço </Title>
                <Col>
                    
                </Col>
            </Row>
        </>
    )
}

export default LineChart
