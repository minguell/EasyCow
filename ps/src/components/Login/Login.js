import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    login: "",
    senha: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do login submetidos:", formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "0 auto" }}>
      <div>
        <label htmlFor="login">Login:</label>
        <input
          type="text"
          id="login"
          name="login"
          value={formData.login}
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
      <button type="submit">Entrar</button>
    </form>
  );
};

export default Login;
