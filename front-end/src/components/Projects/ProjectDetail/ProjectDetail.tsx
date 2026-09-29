"use client";
import { useState, useEffect } from "react";
import { getProject } from "@/services/projectService";
import { getTasks } from "@/services/taskService";
import type { ProjectWithTasks } from "@/types/ProjectsWithTasks";
import { BackButton } from "@/components/buttons/IconButton/IconButton";
import styles from "./ProjectDetail.module.scss";
import { Button } from "@/components/buttons/Button/Button";
import { SquareIaButton } from "@/components/buttons/IaButton/IaButton";

type ProjectDetailProps = {
  projectId: string;
};

export const ProjectDetail = ({ projectId }: ProjectDetailProps) => {
  const [project, setProject] = useState<ProjectWithTasks | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const [loadedProject, tasks] = await Promise.all([
          getProject(projectId),
          getTasks(projectId),
        ]);
        setProject({ ...loadedProject, tasks });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Projet introuvable !");
      } finally {
        setIsLoading(false);
      }
    };
    loadProject();
  }, [projectId]);

  if (isLoading) return <p>Chargement du projet...</p>;
  if (error || !project)
    return (
      <p role="alert" className={styles.errorText}>
        {error || "Projet introuvable"}
      </p>
    );

  return (
    <div className={styles.detailPage}>
      <div className={styles.detailHeaderWrapper}>
        <div className={styles.detailHeaderTitleBanner}>
          <BackButton />
          <div className={styles.detailHeaderTitleWrapper}>
            <div className={styles.detailHeaderTitleAndLink}>
              <h1 className={styles.detailHeaderTitle}>{project.name}</h1>
              {project.userRole === "ADMIN" && (
                <button
                  type="button"
                  className={styles.detailHeaderbutton}
                  //   onClick={openEdit}
                >
                  Modifier
                </button>
              )}
            </div>
            <p className={styles.detailDescription}>{project.description}</p>
          </div>
        </div>
        <div className={styles.detailHeaderButtonsZone}>
          <Button label="Créer une tâche" />
          <SquareIaButton />
        </div>
      </div>
      <div className={styles.detailHeaderContributors}></div>
    </div>
  );
};
