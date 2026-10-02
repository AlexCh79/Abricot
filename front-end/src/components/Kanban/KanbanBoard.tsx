import styles from "./KanbanBoard.module.scss";
import KanbanCard from "../Cards/KanbanCard/KanbanCard";
import { useId } from "react";
import { sortTasks, STATUS_COLUMN_LABEL } from "@/utils/tasks";
import type { Task, TaskStatus } from "@/types/Task";

type KanbanBoardProps = {
  tasks: Task[];
  statuses: TaskStatus[];
  onViewTask: (task: Task) => void;
  headingLevel?: "h3" | "h4";
  showProject?: boolean;
};

export default function KanbanBoard({
  tasks,
  statuses,
  onViewTask,
  headingLevel: Heading = "h3",
  showProject = true,
}: KanbanBoardProps) {
  const baseId = useId();

  return (
    <div className={styles.kanbanBoard}>
      {statuses.map((status) => {
        const columnTask = sortTasks(tasks.filter((t) => t.status === status));
        const titleId = `${baseId}-${status}`;

        return (
          <section
            key={status}
            className={styles.kanbanColumn}
            aria-labelledby={titleId}
          >
            <Heading id={titleId} className={styles.kanbanColumnTitleColumn}>
              {STATUS_COLUMN_LABEL[status]}
              <span className={styles.columnCount}>{columnTask.length}</span>
            </Heading>
            {columnTask.length === 0 ? (
              <p className={styles.columnEmpty}>Aucune tâche</p>
            ) : (
              <ul className={styles.kanbanTaskContainer}>
                {columnTask.map((task) => (
                  <li key={task.id}>
                    <KanbanCard
                      task={task}
                      showProject={showProject}
                      onView={() => onViewTask(task)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
