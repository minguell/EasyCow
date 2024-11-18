"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import icones from './IconesFonte';
import styles from './IconesTerror.module.css';

const IconesTerror = () => {
  const [iconeAtivo, setIconeAtivo] = useState(icones[0]);
  const textContentRef = useRef(null);
  const [imageMaxHeight, setImageMaxHeight] = useState('auto');
  const [showGleysombrio, setShowGleysombrio] = useState(false);
  const assassinosRef = useRef(null);

  useEffect(() => {
    if (textContentRef.current) {
      setImageMaxHeight(`${textContentRef.current.offsetHeight}px`);
    }
  }, [iconeAtivo]);

  const handleEasterEggClick = () => {
    const gleysombrio = icones.find(icone => icone.nome === "Gleysombrio");
    if (gleysombrio) {
      setIconeAtivo(gleysombrio);
      setShowGleysombrio(true);
      if (assassinosRef.current) {
        assassinosRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="assassinos" ref={assassinosRef}>
      <div className={styles.container}>
        <h1 className={styles.title}>OS ICONES DO TERROR</h1>
        <div className={styles.navbar}>
          {icones.map((icone, index) => (
            <button
              key={index}
              className={`${styles.navItem} ${icone.nome === iconeAtivo.nome ? styles.active : ''} ${icone.nome === "Gleysombrio" && !showGleysombrio ? styles.hidden : ''} ${icone.nome === "Gleysombrio" ? styles.gleysombrio : ''}`}
              onClick={() => setIconeAtivo(icone)}
            >
              {icone.nome}
            </button>
          ))}
        </div>
        <div className={styles.content}>
          <SwitchTransition>
            <CSSTransition
              key={iconeAtivo.nome}
              classNames={{
                enter: styles.fadeEnter,
                enterActive: styles.fadeEnterActive,
                exit: styles.fadeExit,
                exitActive: styles.fadeExitActive,
              }}
              timeout={300}
            >
              <div className={styles.transitionWrapper}>
                <div className={styles.textContent} ref={textContentRef}>
                  <h2 className={styles.iconeName}>{iconeAtivo.nome}</h2>
                  <div className={styles.descriptionContainer}>
                    <p className={styles.iconeDescription}>{iconeAtivo.descricao}</p>
                  </div>               
               </div>
                <div className={styles.imageContainer}>
                  <Image 
                    src={iconeAtivo.imagem} 
                    alt={iconeAtivo.nome} 
                    width={450}
                    height={450}
                    className={styles.image}
                    style={{ maxHeight: imageMaxHeight }}
                  />
                </div>
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <div className={styles.invisibleBox} onClick={handleEasterEggClick}></div>
      </div>
    </section>
  );
};

export default IconesTerror;