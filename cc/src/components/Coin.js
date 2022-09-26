import React from 'react'

const Coin = ({ img, name, symbol, price, priceChange24, marketCap, volume, supply, circSupply }) => {

    // Format numbers to appear with commas
    // error check max supply - may be null for Proof of Stake coins e.g. ETH
    // Add ID for each coin from API

  return (
    <div>
        <img src={img} alt={name + "Symbol"} />
        <h3>{name}</h3>
        <h3>{symbol.toUpperCase()}</h3>
        <p>{price}</p>
        <p>{priceChange24.toFixed(2) + "%"}</p>
        <p>{marketCap}</p> 
        <p>{volume}</p>
        <p>{supply}</p>

    </div>
  )
}

export default Coin