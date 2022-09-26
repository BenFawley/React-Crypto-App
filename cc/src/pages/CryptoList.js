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
    <div>
        {coins && coins.map((coin)=>{
            console.log(coin);
            return <Coin 
            rank={coin.market_cap_rank}
            img={coin.image}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.current_price}
            priceChange24={coin.price_change_percentage_24h}
            marketCap={"$ " + coin.market_cap}
            volume={coin.total_volume}
            supply={coin.max_supply}
            circSupply={coin.circulating_supply}
            />
        })}
        
    </div>
  )
}

export default CryptoList