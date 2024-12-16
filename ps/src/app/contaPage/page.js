"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./page.module.css";
import Conta from "../../components/Conta/Conta";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";



export default function contaPage() {
    const router = useRouter();

  useEffect(() => {
    // Verifica se o token existe no localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/"); // Redireciona para login
    }
  }, [router]);

  return (
    <div>
      <NavBar />
      <Conta />
      <Footer />
    </div>
  );
}