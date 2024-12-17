import React from 'react';
import styles from './Comentar.module.css';

export default function Comentar({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <div className={styles.commentBox}>
          <form className={styles.commentForm}>
            <textarea className={styles.commentInput} id="comment-box" placeholder="Escreva seu comentário..."></textarea>
            <button className={styles.commentSubmit} id="botaoPost">Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}