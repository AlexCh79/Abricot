import type { User } from "./User";

export type Comment = {
  id: string;
  content: string;
  taskId: string;
  authorId: string;
  author: User | null;
  createdAt: string;
  updatedAt: string;
};
