import styles from "./Button.module.scss";

type ButtonProps = {
  label: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export const Button = ({ label, type = "submit", onClick }: ButtonProps) => {
  return (
    <button className={styles.btnBlack} type={type} onClick={onClick}>
      {label}
    </button>
  );
};
