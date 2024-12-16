"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import NavBar from "../../components/NavBar/NavBar";
import NavBarAdmin from "../../components/NavBarAdmin/NavBarAdmin";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Lotes from "../../components/lotesDisponiveis/Lotes";

export default function LotesPage() {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState(null); // null = carregando, "admin" = admin, "user" = usuário comum

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/"); // Redireciona para login se não autenticado
    } else if (token === "admin") {
      setAuthStatus("admin"); // Define status como admin
    } else {
      setAuthStatus("user"); // Define status como usuário comum
    }
  }, [router]);

  // Enquanto o authStatus está carregando, exibe um fallback
  if (authStatus === null) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.page}>
      {authStatus === "admin" ? <NavBarAdmin /> : <NavBar />}
      <main className={styles.main}>
        <Banner />
        <Lotes />
      </main>
      <Footer />
    </div>
  );
}
