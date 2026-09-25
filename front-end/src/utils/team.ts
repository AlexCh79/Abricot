// Fonctions utiles à la gestion des équipes
import type { Project } from "@/types/Project";

// Décompte des membres d'une équipe
export function countTeam(project: Project): number {
  return project.members.length + 1; // +1 pour compter le propriétaire du projet
}
