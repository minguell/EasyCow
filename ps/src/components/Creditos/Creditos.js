"use client";

import React, { useState } from "react";
import styles from "./Creditos.module.css";

const Creditos = () => {
  const [code, setCode] = useState("");

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    alert(`Code submitted: ${code}`);
    setCode("");
  };

  return (
    <div className={styles.creditosContainer}>
      <h2>Insira o Código</h2>
      <input
        type="text"
        value={code}
        onChange={handleInputChange}
        placeholder="Digite o código aqui"
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.submitButton}>
        Enviar
      </button>
    </div>
  );
};

export default Creditos;
