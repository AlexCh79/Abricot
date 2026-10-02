import { Tag } from "@/components/tags/Tag";
import styles from "./KanbanCard.module.scss";
import type { Task } from "@/types/Task";
import Image from "next/image";
import { formatDueDate } from "@/utils/dates";
import { Button } from "@/components/buttons/Button/Button";
import { PRIORITY_LABEL, PRIORITY_VARIANTS } from "@/utils/tasks";

type KanbanCardProps = {
  task: Task;
  onView: () => void;
  showProject?: boolean;
};

export default function KanbanCard({
  task,
  onView,
  showProject = true,
}: KanbanCardProps) {
  return (
    <div className={styles.kanbanCard}>
      <div className={styles.kanbanCardTask}>
        <div className={styles.kanbanCardTaskTitleZone}>
          <div className={styles.kanbanCardTaskTitleFrame}>
            <h4 className={styles.kanbanCardTitle}>{task.title}</h4>
            <p className={styles.kanbanCardSubtitle}>{task.description}</p>
          </div>
          <Tag
            label={PRIORITY_LABEL[task.priority]}
            variant={PRIORITY_VARIANTS[task.priority]}
          />
        </div>
        <div className={styles.kanbanCardProject}>
          {showProject && (
            <div className={styles.kanbanCardProjectZone}>
              <Image
                src="/icon_file_grey.svg"
                width={18}
                height={14}
                alt=""
                aria-hidden="true"
                className={styles.icon}
              />
              <span className={styles.kanbanCardProjectTitle}>
                {task.project.name}
              </span>
            </div>
          )}
          <div className={styles.kanbanCardProjectZone}>
            <Image
              src="/icon_kanban_grey.svg"
              width={15}
              height={17}
              alt=""
              aria-hidden="true"
              className={styles.icon}
            />
            <span className={styles.kanbanCardProjectTitle}>
              {formatDueDate(task.dueDate)}
            </span>
          </div>
          <div className={styles.kanbanCardProjectZone}>
            <Image
              src="/icon_comments.svg"
              width={15}
              height={15}
              alt=""
              aria-hidden="true"
              className={styles.icon}
            />
            <span className={styles.kanbanCardProjectTitle}>
              {task.comments.length}
            </span>
          </div>
        </div>
        <div className={styles.kanbanCardBtnZone}>
          <Button
            label="Voir"
            ariaLabel={`Voir la tâche ${task.title}`}
            onClick={onView}
            type="button"
          />
        </div>
      </div>
    </div>
  );
}
