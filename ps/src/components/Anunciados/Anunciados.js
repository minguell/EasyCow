import styles from "./Anunciados.module.css";
import Image from "next/image";

export default function Anunciados() {

  return (
    <div className={styles.overlay}>
      <div className={styles.anunciosSection}>
        <h3>Anúncios em andamento</h3>
        <ul className={styles.anunciosList}>
          <li>Em breve...</li>
        </ul>
      </div>
    </div>
  );
}