import React, { useEffect, useState } from "react";
import styles from "./Conta.module.css";
import Image from "next/image";
import ProfilePic from "../../assets/Usuarios/Miguel.png";

export default function Conta() {
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

  if (!isAdmin) {
    return <div>Acesso negado</div>;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.profileSection}>
        <Image 
          src={ProfilePic} 
          alt="Profile Picture" 
          className={styles.profileImage} 
          width={300} 
          height={300} 
        />
        <h2 className={styles.fullName}>{token || "Usuário Desconhecido"}</h2>
      </div>

      <div className={styles.infoSection}>
        <p><strong>Data de nascimento:</strong> 01/01/2000</p>
        <p><strong>Email:</strong> miguel@gmail.com</p>
      </div>

      <div className={styles.historySection}>
        <h3>Histórico de Compras</h3>
        <ul className={styles.historyList}>
          <li>Em breve...</li>
        </ul>
      </div>
    </div>
  );
}