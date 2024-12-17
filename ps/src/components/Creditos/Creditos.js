"use client";

import React, { useState } from "react";
import styles from "./Creditos.module.css";

const Creditos = () => {
  const limitChars = 9; // Tamanho correto do código, incluindo o hífen
  const [code, setCode] = useState("");
  const [credit, setCredit] = useState(null); // Crédito retornado pelo backend

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {

    const codeRegex = new RegExp(`^.{${limitChars}}$`); // Verifica tamanho exato do código

    // Validação para garantir que o código tenha exatamente 9 caracteres
    if (!codeRegex.test(code)) {
      alert("O código deve conter exatamente " + limitChars + " caracteres.");
      return;
    }


    // Faz uma requisição ao backend para buscar o crédito do código
    fetch(`http://localhost:5000/api/giftcard?codigo=${encodeURIComponent(code)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Código inválido ou erro ao acessar a API");
        }
        return response.json();
      })
      .then((data) => {
        // Logando a resposta da API para verificar o que é retornado
        console.log("Resposta da API:", data);
        if (data.mensagem) {
          alert(data.mensagem); // Mostra mensagem de erro, se houver
        } else if (data.usado) {
          alert("Este código já foi utilizado.");
        } else {
          alert(`Código enviado: ${code}\nCrédito recebido: ${data.valor}`);
          setCredit(data.valor); // Atualiza o estado com o crédito recebido
          setCode(""); // Limpa o campo de entrada
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar gift card:", error);
        alert("Código inválido");
      });
  };

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
