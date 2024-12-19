"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Conta from "../../components/Conta/Conta";
import Vendidos from "../../components/Vendidos/Vendidos";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import histCompras from "../../components/histCompras/histCompras";

export default function ContaPage() {
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Verifica se o token existe no localStorage
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) {
      router.push("/"); // Redireciona para login
    } else {
      setToken(storedToken);
      if (storedToken == 'admin') {
        router.push("/lotesPage"); // Redireciona para lotesPage se for admin
      } 
    }
  }, [router]);

  if (!token) {
    return null; // Retorna null enquanto redireciona
  }

  return (
    <div>
      <NavBar />
      <Conta  />
      <Vendidos />
      <Footer />
    </div>
  );
}