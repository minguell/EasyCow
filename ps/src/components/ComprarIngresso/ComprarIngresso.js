"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import BannerImage from "@/assets/NekoSkull.png";
import styles from './ComprarIngresso.module.css';

const ComprarIngresso = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [favoriteMovie, setFavoriteMovie] = useState('');
  const [courageLevel, setCourageLevel] = useState('');

  const handleEnviarClick = (e) => {
    if (!name || !email || !favoriteMovie || !courageLevel) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    alert(`Nome: ${name}\nEmail: ${email}\nFilme Preferido: ${favoriteMovie}\nNível de Coragem: ${courageLevel}`);

    setName('');
    setEmail('');
    setFavoriteMovie('');
    setCourageLevel('');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
  <section id="ingressos">
    <div className={styles.container}>
      <h1 className={styles.title}>COMPRAR INGRESSO</h1>
      <div className={styles.formContainer}>
        <div className={styles.inputsContainer}>
          <form>
          <input
            className={styles.input}
            type="text"
            placeholder="NOME"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={styles.input}
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="FILME PREFERIDO"
            value={favoriteMovie}
            onChange={(e) => setFavoriteMovie(e.target.value)}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="NÍVEL DE CORAGEM"
            value={courageLevel}
            onChange={(e) => setCourageLevel(e.target.value)}
          />
          <div className={styles.buttonContainer}>
            <button className={styles.button} onSubmit={handleEnviarClick}>
              Enviar
            </button>  
              </div>
          </form>
        </div>
        <div className={styles.imageContainer}>
          <Image src={BannerImage} className={styles.image} alt="Banner" width={480} height={480} />
        </div>
      </div>
    </div>
    </section>
  );
};

export default ComprarIngresso;