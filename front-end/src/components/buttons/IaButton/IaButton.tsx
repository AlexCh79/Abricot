import styles from "./IaButton.module.scss";
import IaIcon from "@/components/icons/IaIcon";

export const IaButton = () => {
  return (
    <button
      type="button"
      className={styles.iaButton}
      aria-label="Générer des tâches avec l'IA"
    >
      <IaIcon className={styles.iaIcon} />
    </button>
  );
};

export const SquareIaButton = () => {
  return (
    <button
      type="button"
      className={styles.iaSquareButton}
      aria-label="Générer des tâches avec l'IA"
    >
      <IaIcon className={styles.iaSquareIcon} />
      IA
    </button>
  );
};
