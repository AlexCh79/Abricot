import styles from "./Button.module.scss";

type ButtonProps = {
  label: string;
  type?: "button" | "submit";
  form?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  label,
  type = "submit",
  form,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={styles.btnBlack}
      type={type}
      form={form}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
