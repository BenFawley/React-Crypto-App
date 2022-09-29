import React from 'react';
import styles from './ChartBar.module.css';

const ChartBar = ({ circSupply, maxSupply }) => {

    let barFillWidth = 0;
    if(circSupply > 0){
        barFillWidth = circSupply / maxSupply * 100;
    }

  return (
    <div className={styles.chartBar}>
        <div className={styles.chartBarInner}>
            <div className={styles.chartBarFill} style={{width: barFillWidth + "%"}}></div>
        </div>
    </div>
  )
}

export default ChartBar