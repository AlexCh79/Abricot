import styles from "./HeadButton.module.scss";
import Link from "next/link";
import DashboardIcon from "../../icons/DashboardIcon";
import FileIcon from "../../icons/FileIcon";

export const DashButton = () => {
  return (
    <Link href="/dashboard" className={styles.btnLink}>
      <DashboardIcon className={styles.navIcon} />
      <span className={styles.btnTitle}>Tableau de bord</span>
    </Link>
  );
};

export const FileButton = () => {
  return (
    <Link href="/projects" className={styles.btnLink}>
      <FileIcon className={styles.navIcon} />
      <span className={styles.btnTitle}>Projets</span>
    </Link>
  );
};
