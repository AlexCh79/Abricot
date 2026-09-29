import styles from "./Chips.module.scss";
import Image from "next/image";

type ChipsProps = {
  label: string;
  source: string;
  isActive?: boolean;
  onClick?: () => void;
};

export const Chips = ({ label, source, isActive, onClick }: ChipsProps) => {
  return (
    <button
      type="button"
      className={styles.btnLink}
      aria-pressed={isActive}
      onClick={onClick}
    >
      <Image
        src={source}
        aria-hidden="true"
        alt=""
        className={styles.icons}
        width={15}
        height={17}
      />
      {label}
    </button>
  );
};
