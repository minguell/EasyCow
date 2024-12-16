"use client";
import { useState, useEffect } from "react";
import styles from "./Venda.module.css"; 
import { useRouter } from "next/navigation";

export default function Venda() {
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Acessa o token do localStorage
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken); // Atualiza o estado com o token
      if (storedToken !== 'admin') {
        setIsAdmin(true); // Define isAdmin como true se o token for 'admin'
      }
    }
  }, []);

  if (!isAdmin) {
    return <div>Acesso negado</div>;
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