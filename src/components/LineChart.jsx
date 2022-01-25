import { Col, Row, Typography } from 'antd';
import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {

    const coinPrice = [];
    const coinTimeStamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }


    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        var timestamp = coinHistory?.data?.history[i].timestamp;

        var unixTimeStamp = new Date(timestamp*1000);
        var date = unixTimeStamp.toLocaleDateString();

        coinTimeStamp.push(date);
    }

    coinPrice.reverse();
    coinTimeStamp.reverse();
    
    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: "Preço em US$",
                data: coinPrice,
                fill: false,
                backgroundColor: "#0071bd",
                borderColor: "#0071bd"
            }
        ]
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ],
        }
    }

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} Gráfico de preço </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change"> {coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price"> Preço atual {coinName} US${currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} option={options} />
        </>
    )
}

export default LineChart
