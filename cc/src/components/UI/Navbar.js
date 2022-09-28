import React from 'react';
import Button from './Button';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.logo}>
          <h1>DE<span>FI</span></h1>
        </div>
        <div className={styles.navLinks}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/coins">Cryptocurrency</a></li>
            <li><a href="/">Exchange</a></li>
          </ul>
        </div>
        <div className={styles.navSearch}>
          <Button backgroundColor={"#8347e5"} text={"Connect Wallet"}/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar