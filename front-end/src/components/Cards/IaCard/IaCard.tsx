import styles from "./IaCard.module.scss";
import Image from "next/image";

type IaCardProps = {
  title: string;
  description?: string;
};

export const IaCard = ({ title, description }: IaCardProps) => {
  return (
    <div className={styles.IaCard}>
      <div className={styles.IaCardContent}>
        <div className={styles.IaCardTitleZone}>
          <h3 className={styles.IaCardTitle}>{title}</h3>
          <p className={styles.IaCardSubtitle}>{description}</p>
        </div>
        <div className={styles.IaCardContentZone}>
          <button className={styles.IaCardActionZone} type="button" disabled>
            <Image
              src="/icon_trash.svg"
              width={16}
              height={14}
              alt=""
              aria-hidden="true"
              className={styles.IaCardActionIcon}
            />
            <span className={styles.IaCardAction}>Supprimer</span>
          </button>
          <span className={styles.line}></span>
          <button className={styles.IaCardActionZone} type="button" disabled>
            <Image
              src="/icon_modify.svg"
              width={16}
              height={14}
              alt=""
              aria-hidden="true"
              className={styles.IaCardActionIcon}
            />
            <span className={styles.IaCardAction}>Modifier</span>
          </button>
        </div>
      </div>
    </div>
  );
};
