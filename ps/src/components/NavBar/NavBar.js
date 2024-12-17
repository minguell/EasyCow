"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './NavBar.module.css';
import { useRouter } from "next/navigation"; 
import Creditos from "../Creditos/Creditos";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreditosPopupOpen, setIsCreditosPopupOpen] = useState(false);
  const router = useRouter(); // Hook para controle de navegação

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const openCreditosPopup = () => {
    setIsCreditosPopupOpen(true);
  };

  const closeCreditosPopup = () => {
    setIsCreditosPopupOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiration");
    router.push("/");
  }


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.menuIcon} onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
        <li><Link href="/lotesPage" onClick={closeMenu}>LOTES</Link></li>
        <li><Link href="/vendaPage" onClick={closeMenu}>VENDER</Link></li>
        <li><Link href="/contaPage" onClick={closeMenu} >CONTA</Link></li>
        <li><a onClick={openCreditosPopup} style={{ cursor: "pointer" }}>CRÉDITOS</a></li>
        <li><Link href="/" onClick={handleLogout}>SAIR</Link></li>
      </ul>
      {isCreditosPopupOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={closeCreditosPopup}>
              &times;
            </button>
            <Creditos />
          </div>
          <div className={styles.popupOverlay} onClick={closeCreditosPopup}></div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;