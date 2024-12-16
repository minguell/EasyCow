"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./page.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Lotes from "../../components/lotesDisponiveis/Lotes";

export default function LotesPage() {

    const router = useRouter();

  useEffect(() => {
    // Verifica se o token existe no localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/"); // Redireciona para login
    }
  }, [router]);

  return (
    <div className={styles.page}>
      <NavBar />
      <main className={styles.main}>
        <Banner />
        <Lotes />
      </main>
      <Footer />
    </div>
  );
}