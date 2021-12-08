import React, {useState, useEffect} from 'react';
import {Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';
import {useGetCryptoNewsQuery} from '../services/cryptoNewsApi';

const {Title, Text} = Typography;
const {Option} = Select;

const News = ({ simplified }) => {
 
    const count = simplified ? 6 : 12;
    const { data:cryptoNews } = useGetCryptoNewsQuery( { newsCategory:'Cryptocurrency',count:count}  );
    const [newsList,setNews] = useState(cryptoNews?.value);
    const [searchTerm,setSearchTerm] = useState("");

    if (!newsList) {
        return "Loading..."
    }

    return (
        <Row gutter={[24,24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Selecione uma criptomoeda"
                        optionFilterProp="children"
                        onChange={(event) => setSearchTerm(event.target.value)}
                        filterOption={(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                    >

                    </Select>
                </Col>

            )}
            { renderCardForEachNews(newsList) }
        </Row>
    )
}

const renderCardForEachNews = (newsList) => {

    const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

    return newsList?.map( (news,arrayIndex) =>(
        <Col xs={24} sm={12} lg={8} key={arrayIndex}>
            <Card hoverable className="news-card">
                <a href={news.url} target="_blank" rel="noreferrer">
                    <div className="news-image-container">
                        <Title className="news-title" level={4}>{news.name}</Title>
                        <img style={{maxWidth:'200px',maxHeight:'100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                    </div>
                    <p>
                        {news?.description > 100 ? `${news?.description.substring(0,100)}...`: news?.description }
                    </p>
                    <div className="provider-container">
                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                        <Text className="provider-name">{news?.provider[0]?.name}</Text>
                    </div>
                    <Text>{moment(news?.datePublished).startOf('ss').fromNow()}</Text>
                </a>
            </Card>
        </Col>
    ))
}


export default News
