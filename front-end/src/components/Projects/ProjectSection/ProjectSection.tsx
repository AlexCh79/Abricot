"use client";

import { useState, useEffect } from "react";
import styles from "./ProjectSection.module.scss";
import { ProjectModal } from "@/components/Modal/ProjectModal/ProjectModal";
import { Button } from "@/components/buttons/Button/Button";
import { ProjectList } from "../ProjectList/ProjectList";
import { getProjects } from "@/services/projectService";
import { getTasks } from "@/services/taskService";
import type { ProjectWithTasks } from "@/types/ProjectsWithTasks";

export function ProjectSection() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectWithTasks[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Récupération des projets et des tâches affiliées
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const loadedProjects = await getProjects();
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

  // Un projet vient d'être créé, pas de tâche
  const handleCreated = (project: ProjectWithTasks) => {
    setProjects((current) => [project, ...current]);
  };

  return (
    <div className={styles.projectsPage}>
      <div className={styles.projectsHeader}>
        <div className={styles.projectsTitleWrapper}>
          <h1 className={styles.projectsTitle}>Mes projets</h1>
          <p className={styles.projectsSubtitle}>Gérez vos projets</p>
        </div>
        <Button
          type="button"
          label="+ Créer un projet"
          onClick={() => setIsCreateOpen(true)}
        />
      </div>
      <div className={styles.projectsContent}>
        <ProjectList projects={projects} isLoading={isLoading} error={error} />
      </div>
      {isCreateOpen && (
        <ProjectModal
          onClose={() => setIsCreateOpen(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}
