import React from 'react';
import styles from './Comprar.module.css';

export default function Comprar({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <p>Tem certeza que deseja comprar este lote?</p>
        <div className={styles.buttons}>
          <button className={styles.confirmButton} onClick={onConfirm}>Sim</button>
          <button className={styles.cancelButton} onClick={onClose}>Não</button>
        </div>
      </div>
    </div>
  );
}
