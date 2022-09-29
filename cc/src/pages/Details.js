import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styles from './Details.module.css';

const Details = () => {
  const [coin, setCoin] = useState(null);
  const [trending, setTrending] = useState([]);

  const { id } = useParams();


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
            <span className={styles.percent} style={{color: coin.price_change_percentage_24h > 0 ? "green" : "red"}}>{coin.price_change_percentage_24h.toFixed(2)}%</span>
          </h2>
        </div>
      </div>
      <div className={styles.marketData}>
        
      </div>
    </div>
  )
}

export default Details