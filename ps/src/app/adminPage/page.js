"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./page.module.css";
import Aprovar from "../../components/Aprovar/Aprovar";
import NavBarAdmin from "../../components/NavBarAdmin/NavBarAdmin";
import Footer from "../../components/Footer/Footer";



export default function contaPage() {
    const router = useRouter();

  useEffect(() => {
    // Verifica se o token existe no localStorage
    const token = localStorage.getItem("authToken");


    if (token != "admin") {
      router.push("/"); // Redireciona para login
    }
  }, [router]);

  return (
    <div>
      <NavBarAdmin />
      <Aprovar />
      <Footer />
    </div>
  );
}