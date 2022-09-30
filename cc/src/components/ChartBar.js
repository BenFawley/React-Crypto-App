import React from 'react';
import styles from './ChartBar.module.css';

const ChartBar = ({ circSupply, maxSupply, margin }) => {

    let barFillWidth = 0;
    if(circSupply > 0){
        barFillWidth = circSupply / maxSupply * 100;
    }

  return (
    <div className={styles.chartBar} style={{margin: margin}}>
        <div className={styles.chartBarInner}>
            <div className={styles.chartBarFill} style={{width: barFillWidth + "%"}}></div>
        </div>
    </div>
  )
}

export default ChartBar