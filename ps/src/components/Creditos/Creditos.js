// Creditos.js
"use client";

import React, { useState } from "react";
import styles from "./Creditos.module.css";

const Creditos = () => {
  const limitChars = 9; // Tamanho correto do código, incluindo o hífen
  const [code, setCode] = useState("");
  const [credit, setCredit] = useState(null); // Crédito retornado pelo backend
  const token = localStorage.getItem("authToken");

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    const codeRegex = new RegExp(`^.{${limitChars}}$`); // Verifica tamanho exato do código

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
        if (data.mensagem) {
          alert(data.mensagem); // Mostra mensagem de erro, se houver
        } else if (data.usado) {
          alert("Este código já foi utilizado.");
        } else {
          alert(`Código enviado: ${code}\nCrédito recebido: ${data.valor}`);
          setCode(""); // Limpa o campo de entrada

          // Faz uma requisição para atualizar o saldo do usuário no backend
          fetch("http://localhost:5000/api/atualizar-saldo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome: token, // Nome do usuário
              valor: data.valor, // Crédito recebido
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Erro ao atualizar o saldo.");
              }
              return response.json();
            })
            .then((updateData) => {
              alert(updateData.mensagem); // Exibe mensagem de sucesso

              // Atualiza o status do código de gift card para 'usado' (1)
              fetch("http://localhost:5000/api/atualizar-codigo", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  codigo: code, // Código que foi usado
                  usado: 1, // Marca o código como utilizado
                }),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Erro ao atualizar status do código.");
                  }
                  return response.json();
                })
                .then(() => {
                  // Recarrega a página para atualizar o saldo na conta
                  window.location.reload();
                })
                .catch((error) => {
                  console.error("Erro ao atualizar status do código:", error);
                  alert("Erro ao atualizar status do código.");
                });
            })
            .catch((error) => {
              console.error("Erro ao atualizar saldo:", error);
              alert("Erro ao atualizar saldo.");
            });
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
