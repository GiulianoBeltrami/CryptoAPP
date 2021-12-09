import React from 'react';
import {Line, Link} from 'react-chartjs-2';
import {Col,Row,Typography} from 'antd';

const {Title} = Typography;

const LineChart = ({coinHistory, currentPrice, coinName}) => {

    const coinPrice = [];
    const coinTimeStamp = [];

    coinHistory?.data?.history.forEach((element) => {
        coinPrice.push(element.price);
    })

    coinHistory?.data?.history.forEach((element) => {
        coinTimeStamp.push(new Date(element.timestamp).toLocaleDateString());
    })
    
    const data = {
        labels:coinTimeStamp,
        datasets: [
            {
                label:"Preço em US$",
                data:coinPrice,
                fill:false,
                backgroundColor:"#0071bd",
                borderColor:"#0071bd"
            }
        ]
    }

    const options ={
        scales:{
            yAxes:[
                {
                    ticks:{
                        beginAtZero:true
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
            <Line data={data} option={options}/>
        </>
    )
}

export default LineChart
