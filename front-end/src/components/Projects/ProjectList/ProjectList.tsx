"use client";

import { useState, useEffect } from "react";
import { getProjects } from "@/services/projectService";
import { ProjectCard } from "@/components/Cards/ProjectCard/ProjectCard";
import styles from "./ProjectList.module.scss";
import { getTasks } from "@/services/taskService";
import type { ProjectWithTasks } from "@/types/ProjectsWithTasks";

export const ProjectList = () => {
  const [projects, setProjects] = useState<ProjectWithTasks[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const loadedProjects = await getProjects();
        // Récupération des tâches dans les projets
        const tasksByProject = await Promise.all(
          loadedProjects.map((project) => getTasks(project.id)),
        );
        setProjects(
          loadedProjects.map((project, index) => ({
            ...project,
            tasks: tasksByProject[index],
          })),
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Projets indisponibles.");
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (isLoading) return <p>Chargement de vos projets...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (projects.length === 0)
    return <p>Vous n&apos;avez pas encore de projet.</p>;

  return (
    <ul className={styles.list}>
      {projects.map((project) => (
        <li key={project.id} className={styles.listItem}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
};
