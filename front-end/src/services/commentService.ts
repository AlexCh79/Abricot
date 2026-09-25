import type { Comment } from "@/types/Comment";
import { apiFetch } from "./api";

// Création d'un commentaire
export async function createComment(
  projectId: string,
  taskId: string,
  data: {
    content: string;
  },
): Promise<Comment> {
  const body = await apiFetch(
    `/projects/${projectId}/tasks/${taskId}/comments`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );

  return body.data.comment;
}

// Récupération de tous les commentaires
export async function getComments(
  projectId: string,
  taskId: string,
): Promise<Comment[]> {
  const body = await apiFetch(
    `/projects/${projectId}/tasks/${taskId}/comments`,
    {
      method: "GET",
    },
  );

  return body.data.comments;
}

// Récupération d'un commentaire
export async function getComment(
  projectId: string,
  taskId: string,
  commentId: string,
): Promise<Comment> {
  const body = await apiFetch(
    `/projects/${projectId}/tasks/${taskId}/comments/${commentId}`,
    {
      method: "GET",
    },
  );

  return body.data.comment;
}
