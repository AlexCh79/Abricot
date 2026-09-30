import styles from "./TaskModal.module.scss";
import type { Task, TaskStatus } from "@/types/Task";
import { useState } from "react";
import { Modal } from "../Modal";
import Image from "next/image";
import { Button } from "@/components/buttons/Button/Button";
import { createTask, updateTask } from "@/services/taskService";
import { STATUS_LABEL, STATUS_VARIANTS } from "@/utils/tasks";
import { Tag } from "@/components/tags/Tag";

type TaskModalProps = {
  projectId: string;
  task?: Task;
  onClose: () => void;
  onCreated?: (task: Task) => void;
  onUpdated?: (task: Task) => void;
  onDeleted?: () => void;
};

export function TaskModal({
  projectId,
  task,
  onClose,
  onCreated,
  onUpdated,
  onDeleted,
}: TaskModalProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [status, setStatus] = useState<TaskStatus | "">(task?.status ?? "");
  const [dueDate, setDueDate] = useState(task?.dueDate ?? "");
  const [assigneeIds, setAssigneeIds] = useState<string[]>(
    task?.assignees.map((assignee) => assignee.user.id) ?? [],
  );
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      const created = await createTask(projectId, {
        title,
        description,
        assigneeIds,
        dueDate: dueDate || undefined,
      });

      // Mise à jour auto de la nouvelle tâche si le statut est différent de "à faire"
      const finalTask =
        status && status !== "TODO"
          ? await updateTask(projectId, created.id, { status })
          : created;
      onCreated?.({ ...finalTask, comments: [] });
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Création de tâche impossible.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal onClose={onClose} labelledBy="task-modal-title">
      <form className={styles.taskModalPage} onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className={styles.closedZone}
        >
          <Image
            src="/icon_cross.svg"
            width={15}
            height={15}
            className={styles.crossIcon}
            alt=""
          />
        </button>
        <div className={styles.formContentWrapper}>
          <h2 className={styles.formContentTitle}>Créer une tâche</h2>
          <div className={styles.formContent}>
            <div className={styles.formGroupField}>
              <label htmlFor="title" className={styles.formLabel}>
                Titre*
              </label>
              <input
                className={styles.formInput}
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.formGroupField}>
              <label htmlFor="description" className={styles.formLabel}>
                Description*
              </label>
              <input
                className={styles.formInput}
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className={styles.formGroupField}>
              <label htmlFor="dueDate" className={styles.formLabel}>
                Échéance
              </label>
              <input
                type="date"
                className={styles.formInputDate}
                id="dueDate"
                name="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className={styles.formGroupField}>
              <label htmlFor="assignees" className={styles.formLabel}>
                Assigné à :
              </label>
              <select
                className={styles.formInputSelect}
                id="assignees"
                name="assignees"
                value={assigneeIds}
                onChange={(e) => setAssigneeIds([e.target.value])}
              >
                <option value="" disabled>
                  Choisir un ou plusieurs collaborateurs
                </option>
              </select>
            </div>
            <fieldset className={styles.formGroupFieldRadio}>
              <legend className={styles.formLabel}>Statut :</legend>
              {Object.entries(STATUS_LABEL).map(([value, label]) => (
                <label key={value} className={styles.statusChoice}>
                  <input
                    type="radio"
                    name="status"
                    value={value}
                    checked={status === value}
                    onChange={() => setStatus(value as TaskStatus)}
                    className={styles.visuallyHidden}
                  />
                  <Tag
                    label={label}
                    variant={STATUS_VARIANTS[value as TaskStatus]}
                  />
                </label>
              ))}
            </fieldset>
            {error && (
              <p role="alert" className={styles.errorText}>
                {error}
              </p>
            )}
            <Button
              label={isSaving ? "Création..." : "+ Ajouter une tâche"}
              type="submit"
              disabled={isSaving}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
