import React from 'react';
import styles from './Conta.module.css';
import Image from 'next/image';
import ProfilePic from '@/assets/Miguel.png';

const Conta = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <div className={styles.content}>
          <div className={styles.profileSection}>
            <Image 
              src={ProfilePic} 
              alt="Profile Picture" 
              className={styles.profileImage} 
              width={150} 
              height={150} 
            />
            <h2 className={styles.fullName}>Miguel Miguélico Miguelatico</h2>
          </div>
          <div className={styles.infoSection}>
            <p><strong>Data de nascimento:</strong> 01/01/2000</p>
            <p><strong>Email:</strong> miguel@gmail.com</p>
          </div>
          <div className={styles.historySection}>
            <h3>Histórico de Compras</h3>
            <ul className={styles.historyList}>
              <li>Em breve...</li>
            </ul>
          </div>
          {/* Add Close Button at the Bottom */}
          <button className={styles.bottomCloseButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Conta;
