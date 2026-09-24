import type { User } from "./User";

export type ProjectMember = {
  id: string;
  role: string;
  user: User;
  joinedAt: string;
};
