import React, { useState } from "react";
import styles from "./Cadastro.module.css";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    ddn: "",
    fotoDePerfil: null,
    email: "",
    senha: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, fotoDePerfil: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div className={styles.background}>
      <form onSubmit={handleSubmit} className={styles.cadastroForm}>
        <div className={styles.formGroup}>
          <label htmlFor="nome" className={styles.label}>Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="ddn" className={styles.label}>Data de Nascimento:</label>
          <input
            type="date"
            id="ddn"
            name="ddn"
            value={formData.ddn}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="fotoDePerfil" className={styles.label}>Foto de Perfil:</label>
          <input
            type="file"
            id="fotoDePerfil"
            name="fotoDePerfil"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="senha" className={styles.label}>Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Criar Conta
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
