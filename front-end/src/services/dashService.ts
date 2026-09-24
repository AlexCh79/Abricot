import { apiFetch } from "./api";
import type { Task } from "@/types/Task";
import type { Project } from "@/types/Project";

// Récupération des tâches assignées à l'utilisateur connecté
export async function getAssignedTasks(): Promise<Task[]> {
  const body = await apiFetch("/dashboard/assigned-tasks", {
    method: "GET",
  });

  return body.data.tasks;
}

// Récupération des projets contenant des tâches pour l'utilisateur connecté
export async function getProjectWithTasks(): Promise<Project[]> {
  const body = await apiFetch("/dashboard/projects-with-tasks", {
    method: "GET",
  });

  return body.data.projects;
}
