"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

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
        <li><Link href="/" onClick={closeMenu}>HOME</Link></li>
        <li><Link href="/#catalogo" onClick={closeMenu}>CATALOGO</Link></li>
        <li><Link href="/#assassinos" onClick={closeMenu}>ASSASSINOS</Link></li>
        <li><Link href="/#ingressos" onClick={closeMenu}>INGRESSOS</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;