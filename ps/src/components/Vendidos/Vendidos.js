import styles from "./Vendidos.module.css";
import Image from "next/image";

export default function Vendidos() {

  return (
    <div className={styles.overlay}>
      <div className={styles.historySection}>
        <h3>Histórico de Compras</h3>
        <ul className={styles.historyList}>
          <li>Em breve...</li>
        </ul>
      </div>
    </div>
  );
}