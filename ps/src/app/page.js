import styles from "./page.module.css";
import NavBar from "@/components/NavBar/NavBar";
import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import Lotes from "@/components/lotesDisponiveis/Lotes";

export default function Home() {
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