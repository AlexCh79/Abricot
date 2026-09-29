import type { Metadata } from "next";
import { ProjectSection } from "@/components/Projects/ProjectSection/ProjectSection";

export const metadata: Metadata = {
  title: "Projets",
  description: "Liste des projets de l'utilisateur",
};

export default function Projects() {
  return <ProjectSection />;
}
