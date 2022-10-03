import React from 'react';
import styles from './TrendingCoin.module.css';

const TrendingCoin = ({ id, img, name, symbol, rank }) => {
  return (
    <div key={id} className={styles.trendingCoinWrapper}>
        <img src={img} />
        <h4>{name}</h4>
        <p>#{rank}</p>
    </div>
  )
}

export default TrendingCoin