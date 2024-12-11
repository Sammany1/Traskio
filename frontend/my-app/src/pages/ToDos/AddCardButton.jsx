'use client';
import React from 'react';
import styles from './AddCardButton.module.css';

const AddCardButton = ({ onClick }) => {
  return (
    <button className={styles.addcardbutton} onClick={onClick}>
      +
    </button>
  );
};

export default AddCardButton;
