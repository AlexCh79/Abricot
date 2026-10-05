import { Tag } from "@/components/tags/Tag";
import styles from "./DashTaskCard.module.scss";
import { Button } from "@/components/buttons/Button/Button";
import type { Task } from "@/types/Task";
import { STATUS_LABEL, STATUS_VARIANTS } from "@/utils/tasks";
import { formatDueDate } from "@/utils/dates";
import Image from "next/image";

type DashTaskCardProps = {
  task: Task;
  onView: () => void;
};

export default function DashTaskCard({ task, onView }: DashTaskCardProps) {
  return (
    <div className={styles.plentyCard}>
      <div className={styles.plentyCardLeft}>
        <div className={styles.plentyCardTitleContainer}>
          <h3 className={styles.plentyCardTitle}>{task.title}</h3>
          <p className={styles.plentyCardSubtitle}>{task.description}</p>
        </div>
        <div className={styles.plentyCardContent}>
          <div className={styles.plentyCardContentProject}>
            <Image
              src="/icon_file_grey.svg"
              alt=""
              width={18}
              height={14}
              aria-hidden="true"
              className={styles.plentyCardProjectIcon}
            />
            <span className={styles.plentyCardProjectName}>
              {task.project.name}
            </span>
          </div>
          <div className={styles.plentyCardContentProject}>
            <Image
              src="/icon_kanban_grey.svg"
              width={15}
              height={17}
              alt=""
              aria-hidden="true"
              className={styles.plentyCardProjectIcon}
            />
            <span className={styles.plentyCardProjectName}>
              {formatDueDate(task.dueDate)}
            </span>
          </div>
          <div className={styles.plentyCardContentProject}>
            <Image
              src="/icon_comments.svg"
              width={15}
              height={15}
              alt=""
              aria-hidden="true"
              className={styles.plentyCardProjectIcon}
            />
            <span className={styles.plentyCardProjectName}>
              {task.comments.length}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.plentyCardRight}>
        <Tag
          label={STATUS_LABEL[task.status]}
          variant={STATUS_VARIANTS[task.status]}
        />
        <Button
          label="Voir"
          type="button"
          onClick={onView}
          ariaLabel={`Voir la tâche ${task.title}`}
        />
      </div>
    </div>
  );
}
