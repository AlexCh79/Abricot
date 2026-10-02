import styles from "./IaButton.module.scss";
import IaIcon from "@/components/icons/IaIcon";

type IaButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
};

export const IaButton = ({
  onClick,
  disabled,
  type = "button",
}: IaButtonProps) => {
  return (
    <button
      className={styles.iaButton}
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-label="Générer des tâches avec l'IA"
    >
      <IaIcon className={styles.iaIcon} />
    </button>
  );
};

export const SquareIaButton = ({
  onClick,
  disabled,
  type = "button",
}: IaButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles.iaSquareButton}
      aria-label="Générer des tâches avec l'IA"
    >
      <IaIcon className={styles.iaSquareIcon} />
      IA
    </button>
  );
};
