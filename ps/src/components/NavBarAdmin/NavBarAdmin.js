"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './NavBarAdmin.module.css';
import { useRouter } from "next/navigation"; 
import Creditos from "../Creditos/Creditos";

const NavBarAdmin = () => {
 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiration");
    router.push("/");
  }


  return (
    <nav className={styles.navbar}>
      <div className={styles.menuIcon} onClick={toggleMenu}>
        ☰
      </div>
      <ul className={styles.navLinks}>
        <li><Link href="/lotesPage" onClick={closeMenu}>LOTES</Link></li>
        <li><Link href="/adminPage" onClick={closeMenu}>ADMINISTRAR</Link></li>
        <li><Link href="/" onClick={handleLogout}>SAIR</Link></li>
      </ul>
    </nav>
  );
};

export default NavBarAdmin;