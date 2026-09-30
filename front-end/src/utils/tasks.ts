import type { Task, TaskStatus } from "@/types/Task";
import type { TagVariant } from "@/components/tags/Tag";

// Calcul du pourcentage de progression du nombre de tâches terminées
export function getProgress(tasks: Task[]) {
  const countable = tasks.filter((task) => task.status !== "CANCELLED"); // Récupération des tâches qui ne sont pas annulées
  const total = countable.length; // Nombre total de tâches (hors annulées)
  const done = countable.filter((task) => task.status === "DONE").length; // Récupération du nombre de tâches terminées
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return { done, total, percent };
}

// Libellé pour chaque statut de tâche
export const STATUS_LABEL: Record<TaskStatus, string> = {
  TODO: "À faire",
  IN_PROGRESS: "En cours",
  DONE: "Terminée",
  CANCELLED: "Annulée",
};

// Tag correspondant à chaque statut
export const STATUS_VARIANTS: Record<TaskStatus, TagVariant> = {
  TODO: "error",
  IN_PROGRESS: "warning",
  DONE: "success",
  CANCELLED: "disabled",
};

// Nombre de commentaires pour la tâche
export const countComments = (task: Task): number => {
  return task.comments.length;
};
