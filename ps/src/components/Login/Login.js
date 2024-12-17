"use client";
import { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter(); // Hook para controle de navegação
  const [error, setError] = useState(""); // Estado para mensagens de erro

  const DoLogin = async (event) => {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    // Verifica as credenciais
    if (username === "admin" && password === "123") {
      setError(""); // Limpa mensagens de erro
      router.push("/adminPage");
    }

    setError(""); // Limpa mensagens de erro

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const token = username;
    const expirationTime = Date.now() + 5 * 60 * 60 * 1000; // 5 horas em milissegundos
    localStorage.setItem("authToken", token); // cria um token e seta no local storage do navegador
    localStorage.setItem("authTokenExpiration", expirationTime);

    try {
      const response = await fetch('/api/routelogin', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        router.push('/lotesPage'); // Redireciona para a página de lotes
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro ao logar usuário");
      }
    }

    catch (error) {
      console.error(error);
      setError("Erro ao conectar ao servidor");
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
