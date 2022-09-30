import React from 'react';
import styles from './MarketData.module.css';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiFillQuestionCircle } from 'react-icons/ai';
import ChartBar from './ChartBar';

const MarketData = ({ data, dataChange, desc, title, currency, symbol, maxSupply }) => {
  return (
    <div className={styles.marketDataItem}>
        <div className={styles.marketDataTitle}>
        <p>{title}</p>
        <p title={desc}><AiFillQuestionCircle /></p>
        </div>
        <h3>
            {currency ? data.toLocaleString("en-US", {style:"currency", currency:"USD", maximumFractionDigits: 0}) : data.toLocaleString("en-US", {maximumFractionDigits: 0})}
            {symbol && <span className={styles.symbol}>{symbol}</span>}
        </h3>
        {dataChange && <p style={{color: dataChange > 0 ? "green" : "red"}}>
        {dataChange > 0 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}{dataChange.toFixed(2)}%
        </p>}
        {maxSupply != null && <ChartBar circSupply={data} maxSupply={maxSupply} margin={"0 auto 0 0"}/>}
    </div>
  )
}

export default MarketData