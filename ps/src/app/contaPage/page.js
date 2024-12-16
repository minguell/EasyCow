"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Conta from "../../components/Conta/Conta";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

export default function ContaPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Verifica se o token existe no localStorage
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) {
      router.push("/"); // Redireciona para login
    } else {
      setToken(storedToken);
      if (storedToken !== 'admin') {
        setIsAdmin(true); // Define isAdmin como true se o token for 'admin'
      } else {
        router.push("/lotesPage"); // Redireciona para lotesPage se não for admin
      }
    }
  }, [router]);

  if (!token) {
    return null; // Retorna null enquanto redireciona
  }

  return (
    <div>
      <NavBar />
      <Conta token={token} isAdmin={isAdmin} />
      <Footer />
    </div>
  );
}