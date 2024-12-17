import React, { useEffect, useState } from "react";
import styles from "./Conta.module.css";
import Image from "next/image";

export default function Conta() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken"); // Usando o nome do usuário como token aqui.

  useEffect(() => {
    if (!token) return;

    fetch(`http://localhost:5000/api/usuario?nome=${encodeURIComponent(token)}`)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar dados do usuário");
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!userData) {
    return <p>Usuário não encontrado.</p>;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.profileSection}>
        <Image
          src={userData.foto}
          alt="Imagem do usuário"
          className={styles.profileImage}
          width={200}
          height={200}
        />

        <h2 className={styles.fullName}>{userData.nome}</h2>
      </div>

      <div className={styles.infoSection}>
        <p><strong>Data de nascimento:</strong> {new Date(userData.data_nascimento).toLocaleDateString()}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Saldo:</strong> {userData.saldo}</p>
      </div>
    </div>
  );
}