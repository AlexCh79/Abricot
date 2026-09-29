import Link from "next/link";
import styles from "./IconButton.module.scss";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import MoreIcon from "@/components/icons/MoreIcon";

export const backButton = () => {
  return (
    <Link
      href="/projects"
      className={styles.iconButton}
      aria-label="Retour aux projets"
    >
      <ArrowLeftIcon classname={styles.backIcon} />
    </Link>
  );
};

export const moreButton = () => {
  return (
    <button
      type="button"
      className={styles.iconButton}
      aria-label="Options du projet"
    >
      <MoreIcon className={styles.backIcon} />
    </button>
  );
};
