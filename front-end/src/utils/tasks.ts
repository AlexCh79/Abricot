import type { Task } from "@/types/Task";

// Calcul du pourcentage de progression du nombre de tâches terminées
export function getProgress(tasks: Task[]) {
  const countable = tasks.filter((task) => task.status !== "CANCELLED"); // Récupération des tâches qui ne sont pas annulées
  const total = countable.length; // Nombre total de tâches (hors annulées)
  const done = countable.filter((task) => task.status === "DONE").length; // Récupération du nombre de tâches terminées
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return { done, total, percent };
}
