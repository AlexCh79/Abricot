import styles from "./Tag.module.scss";

export type TagVariant =
  "success" | "error" | "warning" | "info" | "normal" | "disabled";

type TagProps = {
  label: string;
  variant: TagVariant;
};

export const Tag = ({ label, variant }: TagProps) => {
  return <span className={`${styles[variant]} ${styles.tag}`}>{label}</span>;
};
