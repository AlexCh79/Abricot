import type { ProjectMember } from "./ProjectMember";
import type { User } from "./User";

export type Project = {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  members: ProjectMember[];
  createdAt: string;
  updatedAt: string;
  owner?: Pick<User, "id" | "email" | "name">;
  _count?: { tasks: number };
  userRole?: "ADMIN" | "CONTRIBUTOR" | null;
};
