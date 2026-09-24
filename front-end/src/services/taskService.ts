import type { Task, TaskPriority } from "@/types/Task";
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
