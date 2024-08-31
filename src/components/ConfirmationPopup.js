import React from 'react';
import styles from '../style/ConfirmationPopup.module.css';

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay} dir='rtl'>
      <div className={styles.popup}>
        <div className={styles.message}>{message}</div>
        <div className={styles.buttons}>
          <button className={styles.confirmButton} onClick={onConfirm}>
          אשר
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            בטל
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
