import React from 'react';
import styles from './Coin.module.css';

const Coin = ({ id, img, name, symbol, price, priceChange24, marketCap, volume, supply, circSupply, rank }) => {

    // Format numbers to appear with commas
    // error check max supply - may be null for Proof of Stake coins e.g. ETH
    // Add ID for each coin from API  
    
    const supplyPercentage = circSupply / supply * 100;
    console.log(supplyPercentage.toFixed(2));

  return (
    <tr id={id} className={styles.coinRow}>
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

        </td>
    </tr>
  )
}

export default Coin