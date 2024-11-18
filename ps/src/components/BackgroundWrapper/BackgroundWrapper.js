import React from 'react';
import Image from "next/image";
import styles from "./BackgroundWrapper.module.css";
import BackgroundImage from "@/assets/Background.png"; // Ajuste o caminho conforme necessário

const BackgroundWrapper = ({ children }) => {
  return (
    <div className={styles.backgroundWrapper}>
      <Image
        src={BackgroundImage}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;