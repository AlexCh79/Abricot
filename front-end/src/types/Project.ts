import type { ProjectMember } from "./ProjectMember";

export type Project = {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  members: ProjectMember[];
  createdAt: string;
  updatedAt: string;
};
