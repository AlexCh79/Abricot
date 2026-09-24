import { apiFetch } from "./api";
import type { Project } from "@/types/Project";

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

// Récupération d'un projet en particulier
export async function getProject(id: string): Promise<Project> {
  const body = await apiFetch(`/projects/${id}`, {
    method: "GET",
  });
  return body.data.project;
}

// Mise à jour d'un projet
export async function updateProject(
  id: string,
  data: { name?: string; description?: string },
): Promise<Project> {
  const body = await apiFetch(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return body.data.project;
}

// Suppression d'un projet
export async function deleteProject(id: string): Promise<void> {
  await apiFetch(`/projects/${id}`, {
    method: "DELETE",
  });
}

// Ajout d'un contributeur au projet
export async function addContributor(
  id: string,
  data: { email: string; role?: "ADMIN" | "CONTRIBUTOR" },
): Promise<void> {
  await apiFetch(`/projects/${id}/contributors`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Retrait d'un contributeur au projet
export async function removeContributor(
  id: string,
  userId: string,
): Promise<void> {
  await apiFetch(`/projects/${id}/contributors/${userId}`, {
    method: "DELETE",
  });
}
