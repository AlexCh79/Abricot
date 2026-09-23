import styles from "./Button.module.scss";

type ButtonProps = { label: string };

export const Button = ({ label }: ButtonProps) => {
  return (
    <button className={styles.btnBlack} type="submit">
      {label}
    </button>
  );
};
