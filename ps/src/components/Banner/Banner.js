import Image from "next/image";
import styles from "./Banner.module.css";
import BannerImage from "@/assets/banner_EASYCOW.png";
import { auto } from "@popperjs/core";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <Image
        src={BannerImage}
        alt="EasyCow Banner"
        quality={100}
        style={{
          position: "relative", /* Ensures it can be centered */
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 0%)", /* Centers the image */
          // maxHeight: "40vw",
          width: "100%",
          height: "auto",
          objectFit: "contain",
          objectPosition: "top",
        }}
        
      />
    </div>
  );
}