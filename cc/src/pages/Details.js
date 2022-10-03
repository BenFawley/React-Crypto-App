import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styles from './Details.module.css';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import MarketData from '../components/MarketData';
import HistoryChart from '../components/HistoryChart';
import ChartFilter from '../components/ChartFilter';
import TopMover from '../components/TopMover';
import TrendingList from '../components/TrendingList';

const Details = () => {
  const [coin, setCoin] = useState(null);
  const { id } = useParams();
  const [filterOptions, setFilterOptions] = useState({
    time: '7D',
    filterVariable: 'Market Cap',
    frequency: 'daily'
  })
  
  // https://dribbble.com/shots/16421971-Crypto-Trading-Website
  //https://www.google.com/search?q=crypto+dashboard&client=firefox-b-d&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjWl46e6rr6AhWHg1wKHSxcBt0Q_AUoAXoECAEQAw&biw=958&bih=954&dpr=1#imgrc=1YwbVXJ8tfcIUM


  useEffect(()=>{
    fetchCoin(id);
  }, [])

  const fetchCoin = async (id) => {
    const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    const request = await fetch(URL)
    .then((res)=>res.json());
    console.log(request);
    let obj = request.reduce((found)=>{
      return found;
    });
    setCoin(obj);
  }

  const handleTimeFilter = (filter) => {
    //EDIT LOGIC TO ACCOUNT FOR PRICE/MARKET CAP FILTER AS WELL AS SAME HANDLER FUNCTION IS USED
    //THIS LOGIC IS CURRENTLY BROKEN FOR SWITCHING BETWEEN PRICE/MC- MAY NEED REDUCER
    if(filter !== 'Price' || filter !== 'Market Cap'){
      if(filter === '1D'){
        setFilterOptions({
          ...filterOptions,
          time: filter,
          frequency: 'hourly',
        })
      }else{
      setFilterOptions({
        ...filterOptions,
        time: filter,
        frequency: 'daily',
        })
      }
    } 
    if(filter === 'Market Cap'){
      setFilterOptions({
        ...filterOptions,
        filterVariable: 'Market Cap',
      })
      console.log(filterOptions);
    }
    if(filter === 'Price'){
      setFilterOptions({
        ...filterOptions,
        filterVariable: 'Price',
      })
    }
  }

  return (
    // Refactor this into it's own component for leaner file
    coin &&
    <div className={styles.detailsWrapper}>
      <div className={styles.test}>
        <p className={styles.breadcrumbs}>Cryptocurrency / Coins / {coin.name}</p>
        <div className={styles.title}>
          <img className={styles.icon} src={coin.image} alt={coin.name} />
          <div className={styles.name}>
            <h2>{coin.name}<span>{coin.symbol.toUpperCase()}</span></h2>
            <h2>
              {coin.current_price.toLocaleString("en-US", {style:"currency", currency:"USD",})}<br />
              <span className={styles.percent} style={{color: coin.price_change_percentage_24h > 0 ? "green" : "red"}}>
                {coin.price_change_percentage_24h > 0 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}{coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </h2>
          </div>
          <TopMover />
        </div>
        <h2 className={styles.sectionTitle}>Market Data</h2>
        <div className={styles.marketData}>
          <MarketData data={coin.market_cap} dataChange={coin.market_cap_change_percentage_24h} title={"Market Cap"} desc={"The market cap of a cryptocurrency is determined by the current price multiplied by the circulating supply"} currency={"yes"}/>
          <MarketData data={coin.total_volume} title={"Trading Volume"} desc={"Volume refers to the number of units traded in a market during a given time"} currency={"yes"}/>
          <MarketData data={coin.circulating_supply} title={"Circulating Supply"} desc={"Circulating supply refers to the number of cryptocurrency coins or tokens that are publicly available and circulating in the market."} symbol={coin.symbol.toUpperCase()} maxSupply={coin.max_supply}/>
          <MarketData data={coin.ath} dataChange={coin.ath_change_percentage} title={"All Time High"} desc={"The All-Time High is the highest price ever reached by a cryptocurrency."} currency={"yes"}/>
        </div>
        <div className={styles.chart}>
          <h2>Price Chart</h2>
          <div className={styles.chartFilterOptions}>
            <ChartFilter filterOptions={['Price', 'Market Cap']} onClick={handleTimeFilter} background={filterOptions.filterVariable}/>
            <ChartFilter filterOptions={['1D', '7D', '30D', ]} onClick={handleTimeFilter} background={filterOptions.time}/>
          </div>
          <HistoryChart hideScale={false} id={coin.id} time={filterOptions.time} frequency={filterOptions.frequency} filterVariable={filterOptions.filterVariable} color={'#8347e5'} fill={false}/>
        </div>
      </div>
      <div className={styles.dashboardRight}>
          <TrendingList />
        </div>
    </div>
  )
}

export default Details