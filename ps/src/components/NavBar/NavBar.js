"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cadastro from "../Cadastro/Cadastro";
import Login from "../Login/Login";
import Creditos from "../Creditos/Creditos";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCadastroPopupOpen, setIsCadastroPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isCreditosPopupOpen, setIsCreditosPopupOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const openCadastroPopup = () => {
    setIsCadastroPopupOpen(true);
  };

  const closeCadastroPopup = () => {
    setIsCadastroPopupOpen(false);
  };

  const openLoginPopup = () => {
    setIsLoginPopupOpen(true);
  };

  const closeLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

  const openCreditosPopup = () => {
    setIsCreditosPopupOpen(true);
  };

  const closeCreditosPopup = () => {
    setIsCreditosPopupOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.menuIcon} onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
        <li>
          <Link href="/" onClick={closeMenu}>
            HOME
          </Link>
        </li>
        <li>
          <Link href="/#lotes" onClick={closeMenu}>
            LOTES
          </Link>
        </li>
        <li>
          <Link href="/#notificacoes" onClick={closeMenu}>
            NOTIFICAÇÕES
          </Link>
        </li>
        <li>
          <Link href="/#vender" onClick={closeMenu}>
            VENDER
          </Link>
        </li>
        <li>
          <a onClick={openCadastroPopup} style={{ cursor: "pointer" }}>
            CADASTRO
          </a>
        </li>
        <li>
          <a onClick={openLoginPopup} style={{ cursor: "pointer" }}>
            LOGIN
          </a>
        </li>
        <li>
          <a onClick={openCreditosPopup} style={{ cursor: "pointer" }}>
            CRÉDITOS
          </a>
        </li>
      </ul>
      {isCadastroPopupOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={closeCadastroPopup}>
              &times;
            </button>
            <Cadastro />
          </div>
          <div className={styles.popupOverlay} onClick={closeCadastroPopup}></div>
        </div>
      )}
      {isLoginPopupOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={closeLoginPopup}>
              &times;
            </button>
            <Login />
          </div>
          <div className={styles.popupOverlay} onClick={closeLoginPopup}></div>
        </div>
      )}
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