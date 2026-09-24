import { apiFetch } from "./api";
import type { Project } from "@/types/Project";

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
