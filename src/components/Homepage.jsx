import { Col, Row, Statistic, Typography } from 'antd';
import millify from 'millify';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import Loader from './Loader';
import News from './News';


const { Title } = Typography;

const Homepage = () => {

    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data.stats;

    if (isFetching) {
        return <Loader />
    }

    console.log(data);

    return (
        <>
            <Title level={2} className="heading"> Status global das criptomoedas</Title>
            <Row>
                <Col span={12}> <Statistic title="Total de cryptomoedas" value={globalStats.total} /> </Col>
                <Col span={12}> <Statistic title="Total de trocas" value={millify(globalStats.totalExchanges)} /> </Col>
                <Col span={12}> <Statistic title="Total de capitalização de mercado" value={`US$ ${millify(globalStats.totalMarketCap)}`} /> </Col>
                <Col span={12}> <Statistic title="Total de volume em 24h" value={millify(globalStats.total24hVolume)} /> </Col>
                <Col span={12}> <Statistic title="Total de mercados" value={millify(globalStats.totalMarkets)} /> </Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 criptomoedas no mundo</Title>
                <Title level={3} className="show-more"><Link to="/cryptocurrencies">Mostrar mais</Link></Title>
            </div>
            <Cryptocurrencies simplified />
            <div className="home-heading-container">
                <Title level={2} className="home-title">Últimas notícias</Title>
                <Title level={3} className="show-more"><Link to="/news">Mostrar mais</Link></Title>
            </div>
            <News simplified />
        </>
    )
}

export default Homepage
