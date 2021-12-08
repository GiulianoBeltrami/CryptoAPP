import React, { useState , useEffect } from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom';
import {Card,Row,Col,Input} from 'antd';
import {useGetCryptosQuery} from '../services/cryptoApi';

const Cryptocurrencies = ( { simplified } ) => {

    const count = simplified ? 10 : 100;
    const { data:cryptosList , isFetching } = useGetCryptosQuery(count);
    const [cryptos,setCryptos] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");

    useEffect(() => {
        const filteredCryptoList = filterCryptoListBySearchTerm(cryptosList, searchTerm);
        
        setCryptos(filteredCryptoList);

    } , [cryptosList,searchTerm])
    
    if (isFetching) {
        return "Loading..."
    }

    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input placeholder="Procurar cryptomoeda.." onChange={(event) => setSearchTerm(event.target.value)} />
                </div>
            )}
            
            <Row gutter={[32,32]} className="crypto-card-container">
                { renderCardForEachCurrency(cryptos) }
            </Row>
        </>
    )
}

const renderCardForEachCurrency = (cryptosList) => {
    return cryptosList?.map( (currency) =>(
        <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`} key={currency.id} >
                <Card title={`${currency.rank}.${currency.name}`} 
                      extra={ <img className="crypto-image" src={currency.iconUrl} /> } 
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

const filterCryptoListBySearchTerm = (cryptosList,searchTerm) => {
    return cryptosList?.data.coins.filter((currency) => currency.name.toLowerCase().includes(searchTerm.toLowerCase()) )
}


export default Cryptocurrencies
