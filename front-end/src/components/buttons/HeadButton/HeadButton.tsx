"use client";
import { usePathname } from "next/navigation";
import styles from "./HeadButton.module.scss";
import Link from "next/link";
import DashboardIcon from "../../icons/DashboardIcon";
import FileIcon from "../../icons/FileIcon";

export const DashButton = () => {
  const pathName = usePathname();
  const isActive = pathName.startsWith("/dashboard");
  return (
    <Link
      href="/dashboard"
      className={styles.btnLink}
      aria-current={isActive ? "page" : undefined}
    >
      <DashboardIcon className={styles.navIcon} />
      <span className={styles.btnTitle}>Tableau de bord</span>
    </Link>
  );
};

export const FileButton = () => {
  const pathName = usePathname();
  const isActive = pathName.startsWith("/projects");
  return (
    <Link
      href="/projects"
      className={styles.btnLink}
      aria-current={isActive ? "page" : undefined}
    >
      <FileIcon className={styles.navIcon} />
      <span className={styles.btnTitle}>Projets</span>
    </Link>
  );
};
