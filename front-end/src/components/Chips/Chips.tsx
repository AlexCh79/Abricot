import styles from "./Chips.module.scss";
import Image from "next/image";
import { getInitials } from "@/utils/name";

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

type UserChipProps = {
  name?: string | null;
};

export const UserInitials = ({ name }: UserChipProps) => {
  return <span className={styles.memberInitials}>{getInitials(name)}</span>;
};

export const UserChip = ({ name }: UserChipProps) => {
  return <span className={styles.memberName}>{name}</span>;
};

export const OwnerInitials = ({ name }: UserChipProps) => {
  return <span className={styles.adminInitials}>{getInitials(name)}</span>;
};

export const OwnerChip = () => {
  return <span className={styles.adminChip}>Propriétaire</span>;
};
