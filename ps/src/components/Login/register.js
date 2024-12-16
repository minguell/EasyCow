"use client";
import styles from "./register.module.css"; 
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const [error, setError] = useState(""); // Estado para mensagens de erro
    const router = useRouter(); // Hook para controle de navegação

    const GoLogin = () => {
      router.push("/"); // Redireciona para a página de login
    };
  

    const DoRegister = (event) => {
        event.preventDefault();  // Implementar sistema de registro <<Alterar>>

      const username = event.target.elements.user.value;
      const email = event.target.elements.email.value;
      const date = event.target.elements.date.value;
      const file = event.target.elements.image.files[0];
      const password = event.target.elements.password.value;
      const confirmPassword = event.target.elements.confirmPassword.value;


      if (password == confirmPassword){
        setError(""); // Limpa mensagens de erro

        // REGISTRAR USUÁRIO NO BANCO DE DADOS AQUI --passar os dados nas vars acima

      }else {
        setError("As senhas não coincidem"); 
      }


      };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.form} onSubmit={DoRegister}>
        <div className={styles.loginGroup}>
          <label htmlFor="user" className={styles.labelTxt}>Usuário:</label>
          <input type="text" id="user" name="user" required />
        </div>
        <div className={styles.loginGroup}>
          <label htmlFor="email" className={styles.labelTxt}>Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.loginGroup}>
          <label htmlFor="date" className={styles.labelTxt}>Data Nascimento:</label>
          <input type="date" id="date" name="date" required />
        </div>
        <div className={styles.loginGroup}>
          <label htmlFor="password" className={styles.labelTxt}>Senha:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className={styles.loginGroup}>
          <label htmlFor="confirmPassword" className={styles.labelTxt}>Confirmar Senha:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required />
        </div>
        <div className={styles.loginGroup}>
          <label htmlFor="imageUpload" className={styles.labelTxt}>Foto de Perfil:</label>
          <input type="file" id="imageUpload" name="image" accept="image/*" />
        </div>
        <div className={styles.buttonsGroup}>
            <button type="submit">Registrar</button>
            <button type="submit" onClick={GoLogin}>Voltar</button>
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>} {/* Exibe a mensagem de erro, se houver */}
      </form>
    </div>
  );
}
