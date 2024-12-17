"use client";

import { useState } from "react";
import React from 'react';
import styles from './Comprar.module.css';
import { useRouter } from "next/navigation";

export default function Comprar({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  const [error, setError] = useState(""); // Estado para mensagens de erro
  const router = useRouter(); // Hook para controle de navegação


  const DoCompra = async (event) => {
    event.preventDefault();
  
    const usuario = localStorage.getItem("authToken");  // Definir o 'comprador' corretamente
    const anunciante = event.target.elements.anunciante.value;
    const data_compra = '2024-12-17';  // Definir a data corretamente
  
    if (!usuario) {  // Verificar se o usuário está logado
      setError("Você precisa estar logado para realizar uma compra.");
      return;
    }
  
    // Cria o objeto FormData para enviar os dados ao servidor
    const formData = new FormData();
    formData.append("comprador", usuario);  // Enviar 'comprador' no lugar de 'usuario'
    formData.append("anunciante", anunciante);
    formData.append("data_compra", data_compra);
  
    console.log(formData);
  
    try {
      const response = await fetch('/api/routeCompra', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Compra registrada com sucesso!");
        router.push('contaPage'); // Redireciona para a página de conta
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro ao registrar compra");
      }
    } catch (error) {
      console.error(error);
      setError("Erro ao conectar ao servidor");
    }
  };
  

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <p>Tem certeza que deseja comprar este lote?</p>
        <div className={styles.buttons}>
          <button className={styles.confirmButton} onClick={onConfirm}>Sim</button>
          <button className={styles.cancelButton} onClick={onClose}>Não</button>
        </div>
      </div>
    </div>
  );
}
