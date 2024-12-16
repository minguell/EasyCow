"use client";
import React from "react";
import styles from "./Venda.module.css";

export default function Venda({ token, isAdmin }) {
  if (!isAdmin) {
    return <div>Acesso negado</div>; // Retorna mensagem de acesso negado se não for admin
  }

  return (
    <div className={styles.createContainer}>
        <h1>Preencha os dados do anúncio</h1>
        <form className={styles.form}>
            <div className={styles.groupInputs}> 
                <label htmlFor="nome">Nome do Lote:</label>
                <input type="text" name="nome" id="nome" />
            </div>

            <div className={styles.groupInputs}>
                <label htmlFor="cidade">Cidade:</label>
                <input type="text" name="cidade" id="cidade" />
            </div>

            <div className={styles.groupInputs}>
                <label htmlFor="descrição">Descrição</label>
                <input type="textbox" name="descrição" id="descrição" />
            </div>

            <div className={styles.groupInputs}>
                <label htmlFor="preço">Preço</label>
                <input type="number" name="preço" id="preço" />
            </div>

            <div className={styles.groupInputs}>
                <label htmlFor="imageUpload">Imagem:</label>
                <input type="file" id="imageUpload" name="image" accept="image/*" />
            </div>

            <input type="submit" value="Enviar"/>
        </form>
    </div>
  );
}