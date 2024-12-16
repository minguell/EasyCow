"use client";
import { useState } from "react";
import styles from "./login.module.css"; 
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter(); // Hook para controle de navegação
  const [error, setError] = useState(""); // Estado para mensagens de erro

  const DoLogin = (event) => {
    event.preventDefault(); 

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    // Verifica as credenciais
    if (username === "teste" && password === "123") {
      setError(""); // Limpa mensagens de erro

      const token = "teste"; 
      const expirationTime = Date.now() + 5 * 60 * 60 * 1000; // 5 horas em milissegundos
      localStorage.setItem("authToken", token); // cria um token e seta no local storage do navegador
      localStorage.setItem("authTokenExpiration", expirationTime);



      router.push("/lotesPage"); 
    } else {
      setError("Usuário ou senha inválidos!"); 
    }
  };

  const GoRegister = () => {
    router.push("/registerPage"); 
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.form} onSubmit={DoLogin}>
        <div className={styles.loginGroup}>
          <label htmlFor="username" className={styles.labelTxt}>Usuário:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className={styles.loginGroup}>
          <label htmlFor="password" className={styles.labelTxt}>Senha:</label>
          <input type="password" id="password" name="password" required />
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>} {/* Exibe a mensagem de erro, se houver */}
        <div className={styles.buttonsGroup}>
          <button type="submit" className={styles.logarButton}>Logar</button>
          <button type="button" className={styles.registrarButton} onClick={GoRegister}>Registrar</button>
        </div>
      </form>
    </div>
  );
}
