import type { Task, TaskPriority, TaskStatus } from "@/types/Task";
//import type { Project } from "@/types/Project";
//import type { Comment } from "@/types/Comment";
import { apiFetch } from "./api";

// Création d'une nouvelle tâche
export async function createTask(
  projectId: string,
  data: {
    title: string;
    description?: string;
    priority?: TaskPriority;
    dueDate?: string;
    assigneeIds?: string[];
  },
): Promise<Task> {
  const body = await apiFetch(`/projects/${projectId}/tasks`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return body.data.task;
}

// Récupération de toutes les tâches de l'utilisateur dans un projet
export async function getTasks(projectId: string): Promise<Task[]> {
  const body = await apiFetch(`/projects/${projectId}/tasks`, {
    method: "GET",
  });

  return body.data.tasks;
}

// Récupération d'une tâche dans un projet
export async function getTask(
  projectId: string,
  taskId: string,
): Promise<Task> {
  const body = await apiFetch(`/projects/${projectId}/tasks/${taskId}`, {
    method: "GET",
  });

  return body.data.task;
}

// Mise à jour d'une tâche
export async function updateTask(
  projectId: string,
  taskId: string,
  data: {
    title?: string;
    description?: string;
    priority?: TaskPriority;
    status?: TaskStatus;
    dueDate?: string;
    assigneeIds?: string[];
  },
): Promise<Task> {
  const body = await apiFetch(`/projects/${projectId}/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return body.data.task;
}

// Suppression d'une tâche dans un projet
export async function deleteTask(
  projectId: string,
  taskId: string,
): Promise<void> {
  await apiFetch(`/projects/${projectId}/tasks/${taskId}`, {
    method: "DELETE",
  });
}
