"use client";
import { useState, useId } from "react";
import styles from "./TaskCard.module.scss";
import type { Task } from "@/types/Task";
import { Tag } from "@/components/tags/Tag";
import {
  STATUS_LABEL,
  STATUS_VARIANTS,
  PRIORITY_LABEL,
  PRIORITY_VARIANTS,
} from "@/utils/tasks";
import { MoreButton } from "@/components/buttons/IconButton/IconButton";
import { formatDueDate, commentDate } from "@/utils/dates";
import {
  UserChip,
  UserInitials,
  OwnerInitials,
} from "@/components/Chips/Chips";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/buttons/Button/Button";
import { createComment } from "@/services/commentService";

type TaskCardProps = {
  task: Task;
  onEdit?: () => void;
};

export const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentAdded, setCommentAdded] = useState("");
  const [commentError, setCommentError] = useState("");
  const [comments, setComments] = useState(task.comments);
  const commentsId = useId();
  const commentInputId = useId();

  const { user } = useUser();

  const handleAddComment = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCommentError("");

    const content = commentAdded.trim();
    if (!content) return;
    try {
      const created = await createComment(task.projectId, task.id, { content });
      setComments((current) => [created, ...current]);
      setCommentAdded("");
    } catch (err) {
      setCommentError(
        err instanceof Error ? err.message : "Commentaire non enregistré.",
      );
    }
  };

  return (
    <div className={styles.taskCard}>
      <div className={styles.taskCardTitleContainer}>
        <div className={styles.taskCardTitleWrapper}>
          <div className={styles.taskCardTitleAndStatus}>
            <h4 className={styles.taskCardTitle}>{task.title}</h4>
            <div className={styles.taskTagsContainer}>
              <Tag
                label={STATUS_LABEL[task.status]}
                variant={STATUS_VARIANTS[task.status]}
              />
              <Tag
                label={PRIORITY_LABEL[task.priority]}
                variant={PRIORITY_VARIANTS[task.priority]}
              />
            </div>
          </div>
          <p className={styles.taskCardSubtitle}>{task.description}</p>
        </div>
        <MoreButton
          label={`Modifier la tâche ${task.title}`}
          onClick={onEdit}
        />
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
        <button
          type="button"
          className={styles.toggleButton}
          aria-expanded={isCommentOpen}
          aria-controls={commentsId}
          onClick={() => setIsCommentOpen((open) => !open)}
        >
          <span className={styles.taskCommentsTitle}>
            Commentaires ({comments.length})
          </span>
          <img
            src="/icon_top_arrow.svg"
            alt="Liste des commentaires"
            className={styles.iconArrow}
          />
        </button>
      </div>
      {/* Emplacement des commentaires affichés */}
      {isCommentOpen && (
        <ul id={commentsId} className={styles.commentsList}>
          {comments.length === 0 ? (
            <li className={styles.commentListEmpty}>
              Aucun commentaire pour le moment
            </li>
          ) : (
            comments.map((comment) => (
              <li key={comment.id} className={styles.commentItem}>
                <UserInitials name={comment.author?.name} />
                <div className={styles.commentContent}>
                  <div className={styles.commentContentWrapper}>
                    <div className={styles.commentContentTitleBar}>
                      <span className={styles.commentAuthor}>
                        {comment.author?.name}
                      </span>
                      <span className={styles.commentDate}>
                        {commentDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className={styles.commentText}>{comment.content}</p>
                  </div>
                </div>
              </li>
            ))
          )}
          <li className={styles.commentItem}>
            <OwnerInitials name={user?.name} />
            <form className={styles.commentAddArea} onSubmit={handleAddComment}>
              {commentError && (
                <span role="alert" className={styles.errorText}>
                  {commentError}
                </span>
              )}
              <input
                aria-label="Ajouter un commentaire"
                id={commentInputId}
                name="commentAdded"
                value={commentAdded}
                onChange={(e) => setCommentAdded(e.target.value)}
                className={styles.commentTextArea}
                placeholder="Ajouter un commentaire..."
                maxLength={500}
              />
              <Button
                label="Envoyer"
                type="submit"
                disabled={!commentAdded.trim()}
              />
            </form>
          </li>
        </ul>
      )}
    </div>
  );
};
