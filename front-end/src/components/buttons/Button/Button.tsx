import styles from "./Button.module.scss";

type ButtonProps = {
  label: string;
  type?: "button" | "submit";
  form?: string;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  autoFocus?: boolean;
};

export const Button = ({
  label,
  type = "submit",
  form,
  disabled,
  onClick,
  ariaLabel,
  autoFocus,
}: ButtonProps) => {
  return (
    <button
      className={styles.btnBlack}
      type={type}
      form={form}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      autoFocus={autoFocus}
    >
      {label}
    </button>
  );
};
