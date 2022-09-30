import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styles from './Details.module.css';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import MarketData from '../components/MarketData';
import HistoryChart from '../components/HistoryChart';

const Details = () => {
  const [coin, setCoin] = useState(null);
  const [params, setParams] = useState({

  });

  const { id } = useParams();
  
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

  return (
    coin &&
    <div className={styles.detailsWrapper}>
      <p className={styles.breadcrumbs}>Cryptocurrency / Coins / {coin.name}</p>
      <div className={styles.title}>
        <img className={styles.icon} src={coin.image} alt={coin.name} />
        <div className={styles.name}>
          <h2>{coin.name}<span>{coin.symbol.toUpperCase()}</span></h2>
          <h2>
            {coin.current_price.toLocaleString("en-US", {style:"currency", currency:"USD",})}
            <span className={styles.percent} style={{color: coin.price_change_percentage_24h > 0 ? "green" : "red"}}>
              {coin.price_change_percentage_24h > 0 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}{coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </h2>
        </div>
      </div>
      <div className={styles.marketData}>
        <MarketData data={coin.market_cap} dataChange={coin.market_cap_change_percentage_24h} title={"Market Cap"} desc={"The market cap of a cryptocurrency is determined by the current price multiplied by the circulating supply"} currency={"yes"}/>
        <MarketData data={coin.total_volume} title={"Volume"} desc={"Volume refers to the number of units traded in a market during a given time"} currency={"yes"}/>
        <MarketData data={coin.circulating_supply} title={"Circulating Supply"} desc={"Circulating supply refers to the number of cryptocurrency coins or tokens that are publicly available and circulating in the market."} symbol={coin.symbol.toUpperCase()} maxSupply={coin.max_supply}/>
        <MarketData data={coin.ath} dataChange={coin.ath_change_percentage} title={"All Time High"} desc={"The All-Time High is the highest price ever reached by a cryptocurrency."} currency={"yes"}/>
      </div>
      <div className={styles.chart}>
        <HistoryChart id={coin.id}/>
      </div>
    </div>
  )
}

export default Details