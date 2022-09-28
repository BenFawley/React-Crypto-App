import React from 'react';
import styles from './Button.module.css';

const Button = ({ backgroundColor, text, onClick }) => {
  return (
    <button style={{backgroundColor: backgroundColor}} className={styles.button}>{text}</button>
  )
}

export default Button