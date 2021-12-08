import React from 'react';
import millify from 'millify';
import { Typography,Row,Col,Statistic } from 'antd';
import { Link } from 'react-router-dom';

const {Title} = Typography;

const Homepage = () => {
    return (
        <>
            <Title level={2} className="heading"> Status global das cryptomoedas </Title>
            <Row>
                <Col span={12}> <Statistic title="Total de cryptomoedas" value="5"/> </Col>
                <Col span={12}> <Statistic title="Total de trocas" value="5"/> </Col>    
                <Col span={12}> <Statistic title="Total de capitalização de mercado" value="5"/> </Col>
                <Col span={12}> <Statistic title="Total de volume em 24h" value="5"/> </Col>
                <Col span={12}> <Statistic title="Total de mercados" value="5"/> </Col>
            </Row>
            
        </>
    )
}

export default Homepage
