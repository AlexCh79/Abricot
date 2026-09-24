import type { User } from "./User";

export type TaskAssignee = {
  id: string;
  userId: string;
  taskId: string;
  user: User;
  assignedAt: string;
};
