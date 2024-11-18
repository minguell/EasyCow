import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.mainContent}>
          <div className={styles.socialIcons}>
            <Link href="https://www.instagram.com/ide_jr/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/instagram-icon.png"
                alt="Instagram"
                width={100}
                height={100}
                className={styles.iconImage}
              />
            </Link>
            <Link href="https://www.linkedin.com/company/empresa-j%C3%BAnior-ide/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/linkedin-icon.png"
                alt="LinkedIn"
                width={100}
                height={100}
                className={styles.iconImage}
              />
            </Link>
            <Link href="https://idejr.com.br/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/ide-logo.png"
                alt="Logo-IDE"
                width={100}
                height={100}
                className={styles.iconImage}
              />
            </Link>
          </div>
          <div className={styles.copyrightText}>
            <p>CineIDE © Todos os direitos reservados.</p>
          </div>
          <div className={styles.footerLinks}>
            <Link href="/termos-de-uso">Termos de Uso</Link>
            <span>|</span>
            <Link href="/politica-de-privacidade">Política de Privacidade</Link>
            <span>|</span>
            <Link href="/politica-de-cookies">Política de Cookies</Link>
          </div>
        </div>
        <div className={styles.logoContainer}>
          <Link href="https://idejr.com.br/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/ide-logo.png"
              alt="Logo-IDE"
              width={72}
              height={48}
              className={styles.logoImage}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}