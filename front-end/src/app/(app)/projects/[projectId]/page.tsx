import { Metadata } from "next";
import { ProjectDetail } from "@/components/Projects/ProjectDetail/ProjectDetail";

export const metadata: Metadata = {
  title: "Projet",
  description: "Détail d'un projet et de ses tâches",
};

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[projectId]">) {
  const { projectId } = await params;

  return <ProjectDetail projectId={projectId} />;
}
