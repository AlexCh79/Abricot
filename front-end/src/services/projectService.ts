import { apiFetch } from "./api";
import type { Project } from "@/types/Project";
import type { Task } from "@/types/Task";

// Création d'un nouveau projet
export async function createProject(data: {
  name: string;
  description?: string;
  contributors?: string[];
}): Promise<Project> {
  const body = await apiFetch("/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return body.data.project;
}

// Récupération de tous les projets de l'utilisateur connecté
export async function getProjects(): Promise<Project[]> {
  const body = await apiFetch("/projects", {
    method: "GET",
  });

  return body.data.projects;
}

// Récupération de toutes les tâches d'un projet
export async function getProjectTasks(id: string): Promise<Task[]> {
  const body = await apiFetch(`/projects/${id}/tasks`, {
    method: "GET",
  });

  return body.data.tasks;
}

// Récupération d'un projet en particulier
export async function getProject(id: string): Promise<Project> {
  const body = await apiFetch(`/projects/${id}`, {
    method: "GET",
  });
  return body.data.project;
}
