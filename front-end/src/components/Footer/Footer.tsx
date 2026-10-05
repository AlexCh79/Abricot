import styles from "./Footer.module.scss";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Image
        src="/logo_black.svg"
        aria-hidden="true"
        className={styles.footerLogo}
        alt=""
        width={101}
        height={13}
      />
      <span className={styles.footerContent}>Abricot 2025</span>
    </footer>
  );
};
