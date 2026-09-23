import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img
        src="/logo_black.svg"
        aria-hidden="true"
        className={styles.footerLogo}
      />
      <span className={styles.footerContent}>Abricot 2025</span>
    </footer>
  );
};
