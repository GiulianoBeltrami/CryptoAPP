import React, {useState, useEffect} from 'react';
import {Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';
import {useGetCryptoNewsQuery} from '../services/cryptoNewsApi';

const {Title, Text} = Typography;
const {Option} = Select;

const News = ({ simplified }) => {
 
    const count = simplified ? 6 : 12;
    const { data:cryptoNews} = useGetCryptoNewsQuery( { newsCategory:'Cryptocurrency',count:count}  );
    const [newsList,setNews] = useState(cryptoNews?.value);

    if (!cryptoNews.value) {
         return "Loading..."
    }

    return (
        <Row gutter={[24,24]}>
            {renderCardForEachNews(newsList)}
            {/* <Row gutter={[32,32]} className="crypto-card-container">
                { renderCardForEachCurrency(cryptos) }
            </Row> */}
        </Row>
    )
}

const renderCardForEachNews = (newsList) => {
     return newsList?.map( (news,arrayIndex) =>(
         <Col xs={24} sm={12} lg={8} key={arrayIndex}>
             
            <Card hoverable className="news-card">
                <a href={news.url} target="_blank" rel="noreferrer">
                    <div className="news-image-container">
                        <Title className="news-title" level={4}>{news.name}</Title>
                    </div>
                </a>
            </Card>

        </Col>
    ))
}


export default News
