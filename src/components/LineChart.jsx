import React from 'react'
import {Line} from 'react-chartjs-2'
import{Col , Row,Typography  } from 'antd'

import Chart from 'chart.js/auto';
const {Title} = Typography;

function LineChart({coinHistory,currentPrice,coinName,sparkLine}) {

  const coinPrice=[];
  const coinTimestamp=[];

  for(let i = 0 ; i < sparkLine?.length ;i++){
    coinPrice.push(sparkLine[i])
    coinTimestamp.push(new Date(sparkLine[i]).toLocaleDateString())
  }


  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };


  return (
    <>
        <Row className='chart-header'>
            <Title level={2} className='chart-title'>
                {coinName} Price Chart
            </Title>
            <Col className='price-container' >
                <Title level={5} className='price-change' >{coinHistory}%</Title>
                <Title level={5} className='current-price' >Current {coinName} Price:{currentPrice}</Title>
            </Col>
        </Row>
        <Line data={data} options={options}/>
    </>
  )
}

export default LineChart