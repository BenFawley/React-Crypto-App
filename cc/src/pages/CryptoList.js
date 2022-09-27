import React, { useEffect, useState } from 'react';
import styles from './CryptoList.module.css';
import Coin from '../components/Coin';

const CryptoList = () => {

    const [coins, setCoins] = useState([]);

    useEffect(()=>{
        fetchCrypto();
    }, [])

    const fetchCrypto = async () => {
        const request = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
        .then((res)=>res.json());
        setCoins(request);
        console.log(request);
    }

  return (
    <div className={styles.cryptoList}>
        <h1>Cryptocurrencies</h1>
        {/* Add top movers chart here */}
        <table className={styles.coinTable}>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th></th>
                    <th className={styles.nameTh}>Name</th>
                    <th>Price</th>
                    <th>24%</th>
                    <th>Market Cap</th>
                    <th>Volume</th>
                    <th>Circulating Supply</th>
                </tr>
            </thead>
            <tbody>
            {coins && coins.map((coin)=>{
                return <Coin 
                key={coin.id}
                id={coin.id}
                rank={coin.market_cap_rank}
                img={coin.image}
                name={coin.name}
                symbol={coin.symbol}
                price={coin.current_price}
                priceChange24={coin.price_change_percentage_24h}
                marketCap={coin.market_cap}
                volume={coin.total_volume}
                supply={coin.max_supply}
                circSupply={coin.circulating_supply}
                />
            })}
            </tbody>
        </table>
    </div>
  )
}

export default CryptoList