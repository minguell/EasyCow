import styles from "./page.module.css";
import NavBar from "@/components/NavBar/NavBar";
import Banner from "@/components/Banner/Banner";
import FilmesEmCartaz from "@/components/FilmesEmCartaz/FilmesEmCartaz";
import IconesTerror from "@/components/IconesTerror/IconesTerror";
import ComprarIngresso from "@/components/ComprarIngresso/ComprarIngresso";
import Footer from "@/components/Footer/Footer";
import BackgroundWrapper from "@/components/BackgroundWrapper/BackgroundWrapper";

export default function Home() {
  return (
    <div className={styles.page}>
      <NavBar />
      <main className={styles.main}>
        <Banner />
        <BackgroundWrapper>
          <FilmesEmCartaz />
          <IconesTerror />
          <ComprarIngresso />
        </BackgroundWrapper>
      </main>
      <Footer />
    </div>
  );
}