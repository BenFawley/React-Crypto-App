import React, { useEffect, useState } from 'react';
import styles from './TrendingList.module.css';
import TrendingCoin from './TrendingCoin';

const TrendingList = () => {

    //TODO: Use Fetch response to fetch more data for each trending coin

    const [trendingCoins, setTrendingCoins] = useState([]);

    useEffect(()=>{
        fetchTrendingCoins();
    }, [])

    const fetchTrendingCoins = async () => {
        const response = await fetch("https://api.coingecko.com/api/v3/search/trending")
        .then((res)=>res.json());
        setTrendingCoins(response.coins);
    }

  return (
    <div className={styles.trendingList}>
        <h2 className={styles.sectionTitle}>Trending</h2>
        <div className={styles.trendingListWrapper}>
            {trendingCoins && trendingCoins.map(coin=>{
                return <TrendingCoin key={coin.item.id} id={coin.item.id} img={coin.item.small} name={coin.item.name} symbol={coin.item.symbol} rank={coin.item.market_cap_rank}/>
            })}
        </div>
    </div>
  )
}

export default TrendingList