import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChartBar from './ChartBar';
import styles from './Coin.module.css';

const Coin = ({ id, img, name, symbol, price, priceChange24, marketCap, volume, supply, circSupply, rank }) => {
  
  let navigate = useNavigate();

  return (
    <tr id={id} className={styles.coinRow} onClick={()=>{navigate(`/coin/${id}`)}}>
        <td>{rank}</td>
        <td className={styles.coinImg}><img src={img} alt={name + "Symbol"} /></td>
        <td className={styles.coinName}><h3>{name}<span>{symbol.toUpperCase()}</span></h3></td>
        <td><p>{price.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p></td>
        <td style={{color: priceChange24 > 0 ? "green" : "red"}}><p>{priceChange24.toFixed(2) + "%"}</p></td>
        <td><p>{marketCap.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0})}</p> </td>
        <td><p>{volume.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0})}</p></td>
        <td className={styles.circSupply}>
          <p>{circSupply.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0})}
            <span>{symbol.toUpperCase()}</span>
          </p>
          {supply != null && <ChartBar circSupply={circSupply} maxSupply={supply} />}
        </td>
    </tr>
  )
}

export default Coin