import React, { useEffect, useState } from 'react';
import styles from './TopMover.module.css';
import HistoryChart from './HistoryChart';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

const TopMover = () => {

  const [topCoin, setTopCoin] = useState([]);

  useEffect(()=>{
    fetchTopCoins();
  },[])

  const fetchTopCoins = async () => {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=chainlink%2Cbitcoin%2Cethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h")
    .then((res)=>res.json());
    setTopCoin(response);
    console.log(response);
  }


  return (
    <div className={styles.topMoverFlex}>
    {topCoin && topCoin.map(coin=>{ 
      return <div className={styles.topMoverWrapper}>
              <div className={styles.topMoverIcon}>
                <h4><img src={coin.image} alt={coin.name}/>{coin.name}</h4>
                <p>{coin.symbol.toUpperCase()}</p>
              </div>
              <h4 className={styles.topMoverPrice}>{coin.current_price.toLocaleString("en-US", {style:"currency", currency:"USD"})}</h4>
              <div className={styles.topMoverChart}>
                <HistoryChart className={styles.chartImage} id={coin.id} time={'7D'} frequency={'daily'} color={coin.price_change_percentage_24h > 0 ? 'green' : 'red'} fill={false} filterVariable={'Price'} hideScale={true}/>
                <p style={{color: coin.price_change_percentage_24h > 0 ? "green" : "red"}}>
                  {coin.price_change_percentage_24h > 0 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}{coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </div>
    })}
    </div>
  )
}

export default TopMover