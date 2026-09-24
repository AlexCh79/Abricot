import styles from "./Chips.module.scss";
import Image from "next/image";

type ChipsProps = {
  label: string;
  source: string;
};

export const Chips = ({ label, source }: ChipsProps) => {
  return (
    <button type="button" className={styles.btnLink}>
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
