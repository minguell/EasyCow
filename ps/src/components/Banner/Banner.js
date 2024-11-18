import Image from "next/image";
import styles from "./Banner.module.css";
import BannerImage from "@/assets/image 200.png";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <Image
        src={BannerImage}
        alt="CineIDE Banner"
        quality={100}
        style={{
          position: "relative", /* Ensures it can be centered */
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 0%)", /* Centers the image */
          maxHeight: "100vw",
          objectFit: "cover",
          objectPosition: "bottom",
        }}
        
      />
      <div className={styles.bannerContent}>
        <h1 className={styles.title}>CineIDE</h1>
        <p className={styles.subtitle}>Clássicos do terror, onde o pavor nunca sai de cena</p>
      </div>
    </div>
  );
}