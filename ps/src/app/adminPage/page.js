"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./page.module.css";
import Aprovar from "../../components/Aprovar/Aprovar";
import NavBarAdmin from "../../components/NavBarAdmin/NavBarAdmin";
import Footer from "../../components/Footer/Footer";



export default function adminPage() {
    const router = useRouter();

  useEffect(() => {
    // Verifica se o token existe no localStorage
    const token = localStorage.getItem("authToken");


    if (!token){
        router.push("/");
    }else if (token != "admin") {
      router.push("/lotesPage"); // Redireciona para login
    }
  }, [router]);

  if (token != "admin"){
    return null;
  }

  return (
    <div>
      <NavBarAdmin />
      <Aprovar />
      <Footer />
    </div>
  );
}