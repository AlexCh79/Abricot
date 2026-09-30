import styles from "./TaskCard.module.scss";
import type { Task } from "@/types/Task";
import { Tag } from "@/components/tags/Tag";
import { STATUS_LABEL, STATUS_VARIANTS } from "@/utils/tasks";
import { MoreButton } from "@/components/buttons/IconButton/IconButton";
import { formatDueDate } from "@/utils/dates";
import { UserChip, UserInitials } from "@/components/Chips/Chips";
import { countComments } from "@/utils/tasks";

type TaskCardProps = {
  task: Task;
};

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className={styles.taskCard}>
      <div className={styles.taskCardTitleContainer}>
        <div className={styles.taskCardTitleWrapper}>
          <div className={styles.taskCardTitleAndStatus}>
            <h4 className={styles.taskCardTitle}>{task.title}</h4>
            <Tag
              label={STATUS_LABEL[task.status]}
              variant={STATUS_VARIANTS[task.status]}
            />
          </div>
          <p className={styles.taskCardSubtitle}>{task.description}</p>
        </div>
        <MoreButton />
      </div>
      <div className={styles.taskCalendarContainer}>
        <span className={styles.taskCalendarTitle}>Échéance : </span>
        <img
          src="/icon_kanban_black.svg"
          alt=""
          className={styles.iconCalendar}
        />
        <span className={styles.taskCalendarDate}>
          {formatDueDate(task.dueDate)}
        </span>
      </div>
      <div className={styles.taskAssigneesContainer}>
        <span className={styles.taskAssigneesTitle}>Assigné à :</span>
        {task.assignees.map((member) => (
          <div className={styles.chipsContainer} key={member.id}>
            <UserInitials name={member.user?.name} />
            <UserChip name={member.user?.name} />
          </div>
        ))}
      </div>
      <span className={styles.taskBorder}></span>
      <div className={styles.taskCommentsContainer}>
        <span className={styles.taskCommentsTitle}>
          Commentaires ({countComments(task)})
        </span>
        <button type="button" className={styles.toggleButton}>
          <img
            src="/icon_top_arrow.svg"
            alt="Liste des commentaires"
            className={styles.iconArrow}
          />
        </button>
      </div>
    </div>
  );
};
