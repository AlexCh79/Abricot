import Link from "next/link";
import styles from "./IconButton.module.scss";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import MoreIcon from "@/components/icons/MoreIcon";

export const BackButton = () => {
  return (
    <Link
      href="/projects"
      className={styles.iconButton}
      aria-label="Retour aux projets"
    >
      <ArrowLeftIcon className={styles.backIcon} />
    </Link>
  );
};

type MoreButtonProps = {
  label: string;
  onClick?: () => void;
};

export const MoreButton = ({ label, onClick }: MoreButtonProps) => {
  return (
    <button
      type="button"
      className={styles.iconButton}
      aria-label={label}
      onClick={onClick}
    >
      <MoreIcon className={styles.backIcon} />
    </button>
  );
};
