import { CheckOutlined, DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, MoneyCollectOutlined, NumberOutlined, StopOutlined, ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons';
import { Col, Row, Select, Typography } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';
import Loader from './Loader';


const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {

    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
    const cryptoDetails = data?.data?.coin;

    if (isFetching) {
        return <Loader />
    }

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    return (
        <Col className="coin-detail-container">

            <Col className="coin-heading-container">
                <Title level={2} className="coin-name">
                    {cryptoDetails.name}
                </Title>
                <p>
                    {cryptoDetails.name} preço em US dólares.
                    Veja estatísticas de valor, capitalização de mercado e suprimeto.
                </p>
            </Col>

            <Select defaultValue="7d"
                className="select-timeperiod"
                placeholder="Selecione o periodo"
                onChange={(value) => setTimePeriod(value)}>
                {time.map((date) => <Option key={date}>{date}</Option>)}
            </Select> 

            <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />

            <Col className="stats-container">
                {renderMainStatsInformations(cryptoDetails)}
                {renderGenericStatsInformations(cryptoDetails)}
            </Col>

            <Col className="coin-desc-link">
                <Row className="coin-desc">
                    <Title level={3} className="coin-details-heading">
                        <Title level={3}> What is {cryptoDetails.name}</Title>
                        {HTMLReactParser(cryptoDetails.description)}
                    </Title>
                </Row>
                {renderCryptoDetailsLinks(cryptoDetails)}
            </Col>
        </Col>
    )
}

const renderMainStatsInformations = (cryptoDetails) => {
    const stats = [
        { title: 'Preço para USD', value: `US$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Ranking', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: 'Volume de 24h', value: `US$ ${cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])}`, icon: <ThunderboltOutlined /> },
        { title: 'Capitalização de Mercado', value: `US$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'Maior-valor-de-todos(daily avg.)', value: `US$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    return (
        <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading" >
                <Title level={3} className="coin-details-heading">
                    {cryptoDetails.name} Estatísticas
                </Title>
                <p>
                    Visão geral mostrando o status de {cryptoDetails.name}
                </p>
            </Col>
            {stats.map(({ icon, title, value }) => (
                <Col className="coin-stats">
                    <Col className="coin-stats-name">
                        <Text>{icon}</Text>
                        <Text>{title}</Text>
                    </Col>
                    <Text className="stats">{value}</Text>
                </Col>
            ))}
        </Col>
    );
}

const renderGenericStatsInformations = (cryptoDetails) => {
    const genericStats = [
        { title: 'Número de Mercados', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Número de Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Suprimento Aprovado', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Suprimento Total', value: `US$ ${millify(cryptoDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Suprimento Circulante', value: `US$ ${millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return (
        <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading" >
                <Title level={3} className="coin-details-heading">
                    Outras Estatísticas
                </Title>
                <p>
                    Visão geral de outras estatísticas
                </p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
                <Col className="coin-stats">
                    <Col className="coin-stats-name">
                        <Text>{icon}</Text>
                        <Text>{title}</Text>
                    </Col>
                    <Text className="stats">{value}</Text>
                </Col>
            ))}
        </Col>
    );
}

const renderCryptoDetailsLinks = (cryptoDetails) => {
    return (
        <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
                {cryptoDetails.name} links
            </Title>
            {cryptoDetails.links.map((link) => (
                <Row className="coin-link" key={link.name}>
                    <Title level={5} className="link-name">
                        {link.type}
                    </Title>
                    <a href={link.url} target="_blank" rel="noreferrer">
                        {link.name}
                    </a>
                </Row>
            ))}
        </Col>
    );
}

export default CryptoDetails
