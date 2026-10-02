import { useId, useState } from "react";
import styles from "./IaModal.module.scss";
import { Modal } from "../Modal";
import { IaButton } from "@/components/buttons/IaButton/IaButton";
import Image from "next/image";
import { IaCard } from "@/components/Cards/IaCard/IaCard";
import { Button } from "@/components/buttons/Button/Button";

type IaModalProps = {
  onClose: () => void;
};

export const IaModal = ({ onClose }: IaModalProps) => {
  const titleId = useId();
  const [showProposals, setShowProposals] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowProposals(true);
  };

  return (
    <Modal onClose={onClose} labelledBy={titleId} withCloseButton>
      <div className={styles.IaCreateTaskEmptyContainer}>
        <div className={styles.IaCreateTaskEmptyTitle}>
          <Image
            src="/icon_ia.svg"
            width={21}
            height={21}
            className={styles.IaIcon}
            alt=""
            aria-hidden="true"
          />
          <h2 id={titleId} className={styles.IaCreateTaskTitle}>
            {!showProposals ? "Créer une tâche" : "Vos tâches"}
            <span className={styles.visuallyHidden}> avec l&apos;IA</span>
          </h2>
        </div>
        <div className={styles.IaCreateContent} aria-live="polite">
          {showProposals && (
            <>
              <ul className={styles.IaProposalList}>
                {[1, 2].map((n) => (
                  <li key={n} className={styles.IaProposalCardContainer}>
                    <IaCard
                      title={`Tâche ${n}`}
                      description="IA en cours de déploiement"
                    />
                  </li>
                ))}
              </ul>
              <Button label="+ Ajouter les tâches" type="button" />
            </>
          )}
        </div>
        <form className={styles.IaCommentZone} onSubmit={handleSubmit}>
          <input
            className={styles.IaInput}
            aria-label="Décrivez les tâches que vous souhaitez ajouter avec l'IA."
            placeholder="Décrivez les tâches que vous souhaitez ajouter..."
          />
          <IaButton type="submit" />
        </form>
      </div>
    </Modal>
  );
};
