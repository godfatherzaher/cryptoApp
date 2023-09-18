import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import millify from 'millify'
import { useParams } from 'react-router-dom'
import {Col,Row, Select, Typography} from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';


import {useGetCryptoDetailsQuery} from '../services/cryptoApi'
import LineChart from './LineChart'

const {Title, Text }=  Typography;
const {Option} = Select;


const CryptoDetails = () => {
  const {uuid} = useParams();
  const [timePeriod, setTimePeriod] = useState('7d')
  const{data,isFetching} = useGetCryptoDetailsQuery(uuid)


  const cryptoDetails= data?.data?.coin;
    
 if(isFetching) return 'Loading...'


  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];


  console.log(data);
  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
          <Title level={2} className='coin-name'>
              {cryptoDetails?.name} ({cryptoDetails?.symbol}) price
          </Title>
          <p> 
              {cryptoDetails?.name} live price in US dollars.
              View value statistics, market cap supply
          </p> 
      </Col>
     
      <LineChart coinHistory={cryptoDetails.change}
                   currentPrice={millify(cryptoDetails?.price)}
                   coinName={cryptoDetails?.name}
                   sparkLine={cryptoDetails?.sparkline}
        />
      <Col className='stats-container'>
          <Col className='coin-value-statistics' >
              <Col className='coin-value-statistics-heading' >
                  <Title level={3} className='coin-details-heading'>
                        {cryptoDetails?.name} Value Statistics
                  </Title>
                  <p>
                      An overview showing the stats of {cryptoDetails?.name}
                  </p>
              </Col>
              {stats.map(({icon,title,value}) => (
                  <Col className='coin-stats' >
                      <Col className='coin-stats-name' >
                          <Text>{icon}</Text>
                          <Text>{title}</Text>
                      </Col>
                      <Text className='stats'>{value}</Text>
                  </Col>
              ))}
          </Col>
          <Col className='other-stats-info' >
              <Col className='coin-value-statistics-heading' >
                  <Title level={3} className='coin-details-heading'>
                        Other Statistics
                  </Title>
                  <p>
                      An overview showing the stats of cryptocurrencies
                  </p>
              </Col>
              {genericStats.map(({icon,title,value}) => (
                  <Col className='coin-stats' >
                      <Col className='coin-stats-name' >
                          <Text>{icon}</Text>
                          <Text>{title}</Text>
                      </Col>
                      <Text className='stats'>{value}</Text>
                  </Col>
              ))}
          </Col>
      </Col>

      <Col className='coin-desc-link'>
          <Row className='coin-desc'>
                <Title level={3} className='coin-details-heading'>
                    What is {cryptoDetails?.name}
                    {HTMLReactParser(String(cryptoDetails?.description))}
                </Title>
          </Row>     
          <Col className='coin-links'>
                <Title level={3} className='coin-details-heading'>
                    {cryptoDetails?.name} Links
                </Title>
                {cryptoDetails?.links.map((link)=> (
                  <Row className='coin-link' key={link?.name}>
                        <Title level={5} className='link-name'>
                            {link?.type}
                        </Title>
                        <a href={link.url} target='_blank' rel='noreferre'>
                            {link?.name}
                        </a>
                  </Row>
                ))}
          </Col>           
      </Col>            


    </Col>
  )
}

export default CryptoDetails