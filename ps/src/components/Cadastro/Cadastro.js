import React, { useState } from "react";

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
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="ddn">Data de Nascimento:</label>
        <input
          type="date"
          id="ddn"
          name="ddn"
          value={formData.ddn}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="fotoDePerfil">Foto de Perfil:</label>
        <input
          type="file"
          id="fotoDePerfil"
          name="fotoDePerfil"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          name="senha"
          value={formData.senha}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Criar Conta</button>
    </form>
  );
};

export default Cadastro;
