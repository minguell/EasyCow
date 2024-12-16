"use client";

import React, { useEffect, useState } from "react";
import styles from "./Creditos.module.css";

const Creditos = () => {
  var limitChars = 10;
  var credit = 1000;
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Acessa o token do localStorage
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken); // Atualiza o estado com o token
      if (storedToken === 'teste') {
        setIsAdmin(true); // Define isAdmin como true se o token for 'admin'
      }
    }
  }, []);

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    const codeRegex = new RegExp(`^.{${limitChars}}$`); // Interpolação do valor de limitChars

    if (!codeRegex.test(code)) {
      alert("O código deve conter exatamente " + limitChars + " caracteres.");
      return;
    }

    alert(`Código enviado: ${code}` + "\nCrédito recebido: " + credit);
    setCode("");
  };

  if (!isAdmin) {
    return <div>Acesso negado</div>;
  }

  return (
    <div className={styles.creditosContainer}>
      <h2 className={styles.title}>Insira o Código</h2>
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