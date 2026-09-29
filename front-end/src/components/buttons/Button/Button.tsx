import styles from "./Button.module.scss";

type ButtonProps = {
  label: string;
  type?: "button" | "submit";
  form?: string;
  disabled?: boolean;
  onClick?: () => void;
  autoFocus?: boolean;
};

export const Button = ({
  label,
  type = "submit",
  form,
  disabled,
  onClick,
  autoFocus,
}: ButtonProps) => {
  return (
    <button
      className={styles.btnBlack}
      type={type}
      form={form}
      disabled={disabled}
      onClick={onClick}
      autoFocus={autoFocus}
    >
      {label}
    </button>
  );
};
