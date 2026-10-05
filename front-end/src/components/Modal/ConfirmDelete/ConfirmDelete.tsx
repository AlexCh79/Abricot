import styles from "./ConfirmDelete.module.scss";
import { Button } from "@/components/buttons/Button/Button";

type ConfirmDeleteProps = {
  message: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ConfirmDelete = ({
  message,
  isDeleting,
  onCancel,
  onConfirm,
}: ConfirmDeleteProps) => {
  return (
    <div className={styles.confirmZone}>
      <p role="alert" className={styles.confirmText}>
        {message}
      </p>
      <div className={styles.confirmActions}>
        <Button
          type="button"
          label="Annuler"
          autoFocus
          disabled={isDeleting}
          onClick={onCancel}
        />
        <button
          type="button"
          className={styles.confirmDeleteButton}
          disabled={isDeleting}
          onClick={onConfirm}
        >
          {isDeleting ? "Suppression..." : "Oui, supprimer"}
        </button>
      </div>
    </div>
  );
};
