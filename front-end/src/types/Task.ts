import type { Project } from "./Project";
import type { TaskAssignee } from "./TaskAssignee";
import type { Comment } from "./Comment";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  projectId: string;
  project: Pick<Project, "id" | "name" | "description">;
  creatorId: string;
  assignees: TaskAssignee[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
};
