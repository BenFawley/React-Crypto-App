import React, { useState } from 'react';
import styles from './ChartFilter.module.css';

const ChartFilter = ({ filterOptions, onClick, background }) => {

    const passTimeSelected = (e) => {
        onClick(e.target.id);
        console.log(e.target.id);
    }

  return (
        <div className={styles.filterWrapper}>
            {filterOptions.map(option=>{
                return <p key= {option} id={option} style={{backgroundColor: background === option ? '#7352d6' : 'transparent'}} className={styles.filterChoice} onClick={passTimeSelected}>{option}</p>
            })}
        </div>
    )
}

export default ChartFilter