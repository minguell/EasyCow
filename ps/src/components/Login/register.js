"use client";
import styles from "./register.module.css"; 
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter(); // Hook para controle de navegação

    const GoLogin = () => {
      router.push("/"); // Redireciona para a página de login
    };
  

    const DoRegister = (event) => {
        event.preventDefault();  // Implementar sistema de registro <<Alterar>>
      };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.form}>
        <div className={styles.loginGroup}>
          <label htmlFor="text" className={styles.labelTxt}>Usuário:</label>
          <input type="text" id="text" name="text" required />
        </div>
        <div className={styles.loginGroup}>
          <label htmlFor="password" className={styles.labelTxt}>Senha:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className={styles.loginGroup}>
          <label htmlFor="password" className={styles.labelTxt}>Confirmar Senha:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className={styles.buttonsGroup}>
            <button type="submit" className={styles.logarButton}>Registrar</button>
            <button type="submit" className={styles.registrarButton} onClick={GoLogin}>Voltar</button>
            
        </div>
      </form>
    </div>
  );
}
