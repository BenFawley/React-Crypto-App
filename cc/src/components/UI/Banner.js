import React from 'react';
import styles from './Banner.module.css';
import BanImg from '../../assets/blockchainBannergrad.jpg';
import Button from './Button';

const Banner = () => {
  return (
    <div className={styles.bannerWrap}>
        <img src={BanImg} alt="Crypto Banner"/>
        <div className={styles.bannerText}>
            <h1>Join The Best <span>Cryptocurrency</span> Trading Asset</h1>
            <p>Buy and sell 100+ cryptocurrencies with credit or debit card or connect your wallet to start exchanging today.</p>
            <Button backgroundColor={"#8347e5"} text={"Get Started"}/>
        </div>
    </div>
  )
}

export default Banner