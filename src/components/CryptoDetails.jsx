import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery } from '../services/cryptoApi';


const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {

    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const { data,isFetching } = useGetCryptoDetailsQuery(coinId);
    const cryptoDetails = data?.data?.coin;

    if(isFetching) {
        return 'Loading...'
    }

    const time = ['3h', '24h', '7d', '30d','3m' , '1y',  '3y', '5y'];

    const stats = [
        { title: 'Preço para USD', value: `US$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Ranking', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: 'Volume de 24h', value: `US$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Capitalização de Mercado', value: `US$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'Maior-valor-de-todos(daily avg.)', value: `US$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Número de Mercados', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number de Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Suprimento Aprovado', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Suprimento Total', value: `US$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Suprimento Circulante', value: `US$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return (
        <Col className="coin-detail-container">
            <Col className="coin-heading-container">
                <Title level={2} className="coin-name">
                    {cryptoDetails.name} ({cryptoDetails.slug})
                </Title>
                <p>
                    {cryptoDetails.name} preço em US dólares.
                    Veja estatísticas de valor, capitalização de mercado e suprimeto.
                </p>
            </Col>
            <Select defaultValue="7d"
                    className="select-timeperiod"
                    placeholder="Selecione o periodo"
                    onChange={ (value) => setTimePeriod(value) } 
            >
                {time.map((date) => <Option key={date} value={date}></Option>)}
            </Select>

            <Col>
            
            </Col>

        </Col>
    )
}

export default CryptoDetails
