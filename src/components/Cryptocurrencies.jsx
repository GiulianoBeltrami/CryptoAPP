import { Card, Col, Input, Row } from 'antd';
import millify from 'millify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {

    const numberOfElements = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(numberOfElements);

    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const filteredCryptoList = filterCryptoListBySearchTerm(cryptosList, searchTerm);

        setCryptos(filteredCryptoList);

    }, [cryptosList, searchTerm])

    if (isFetching) {
        return <Loader />
    }


    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input  placeholder="Procurar cryptomoeda.." onChange={(event) => setSearchTerm(event.target.value)} />
                </div>
            )}

            <Row gutter={[32, 32]} className="crypto-card-container">
                {renderCardForEachCurrency(cryptos)}
            </Row>
        </>
    )
}

const renderCardForEachCurrency = (cryptosList) => {
    return cryptosList?.map((currency) => (
        <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`} key={currency.uuid} >
                <Card title={`${currency.rank}.${currency.name}`}
                    extra={<img className="crypto-image" src={currency.iconUrl} />}
                    hoverable
                >
                    <p> Preço: US$ {millify(currency.price)} </p>
                    <p> Capital de mercado: {millify(currency.marketCap)} </p>
                    <p> Mudança diária: {millify(currency.change)} % </p>
                </Card>
            </Link>
        </Col>
    ))
}

const filterCryptoListBySearchTerm = (cryptosList, searchTerm) => {
    return cryptosList?.data.coins.filter((currency) => currency.name.toLowerCase().includes(searchTerm.toLowerCase()))
}


export default Cryptocurrencies;
