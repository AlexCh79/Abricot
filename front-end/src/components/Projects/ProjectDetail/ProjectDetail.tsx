"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProject } from "@/services/projectService";
import { getTasks } from "@/services/taskService";
import type { ProjectWithTasks } from "@/types/ProjectsWithTasks";
import { BackButton } from "@/components/buttons/IconButton/IconButton";
import styles from "./ProjectDetail.module.scss";
import { Button } from "@/components/buttons/Button/Button";
import { SquareIaButton } from "@/components/buttons/IaButton/IaButton";
import { countTeam } from "@/utils/team";
import { ProjectModal } from "@/components/Modal/ProjectModal";
import {
  Chips,
  UserInitials,
  UserChip,
  OwnerChip,
  OwnerInitials,
} from "@/components/Chips/Chips";
import { Search } from "@/components/Inputs/Search";
import { TaskCard } from "@/components/Cards/TaskCard/TaskCard";

type ProjectDetailProps = {
  projectId: string;
};

export const ProjectDetail = ({ projectId }: ProjectDetailProps) => {
  const [project, setProject] = useState<ProjectWithTasks | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const router = useRouter();

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
                  className={styles.detailHeaderLink}
                  onClick={() => setIsEditOpen(true)}
                >
                  Modifier
                </button>
              )}
            </div>
            <p className={styles.detailDescription}>{project.description}</p>
          </div>
        </div>
        <div className={styles.detailHeaderButtonsZone}>
          <Button label="Créer une tâche" type="button" />
          <SquareIaButton />
        </div>
      </div>
      <div className={styles.detailHeaderContributors}>
        <div className={styles.detailHeaderContributorsLeftSection}>
          <h2 className={styles.detailHeaderContributorsTitle}>
            Contributeurs
          </h2>
          <span className={styles.detailHeaderContributorsSubtitle}>
            {countTeam(project)} personne{countTeam(project) > 1 ? "s" : ""}
          </span>
        </div>
        <div className={styles.detailHeaderContributorsRightSection}>
          <div className={styles.detailHeaderContributorsAdminWrapper}>
            <span className={styles.detailsHeadersAdminInitials}>
              <OwnerInitials name={project.owner?.name} />
              <OwnerChip />
            </span>
          </div>
          {project.members.map((member) => (
            <div
              key={member.id}
              className={styles.detailHeaderContributorsMemberWrapper}
            >
              <UserInitials name={member.user?.name ?? null} />
              <UserChip name={member.user?.name ?? null} />
            </div>
          ))}
        </div>
      </div>
      {isEditOpen && (
        <ProjectModal
          project={project}
          onClose={() => setIsEditOpen(false)}
          onUpdated={setProject}
          onDeleted={() => router.replace("/projects")}
        />
      )}
      <div className={styles.detailContentWrapper}>
        <div className={styles.detailContentTitleBanner}>
          <div className={styles.detailContentLeftBanner}>
            <h3 className={styles.detailContentTitle}>Tâches</h3>
            <p className={styles.detailContentSubtitle}>
              Par ordre de priorité
            </p>
          </div>
          <div className={styles.detailContentRightBanner}>
            <div className={styles.detailContentBannerViews}>
              <Chips label="Liste" source="/icon_my_tasks.svg" isActive />
              <Chips
                label="Calendrier"
                source="/icon_kanban.svg"
                isActive={false}
              />
            </div>
            <select className={styles.detailContentBannerSelectStatus}>
              <option value="">Statut</option>
              <option value="TODO">À faire</option>
              <option value="IN_PROGRESS">En Cours</option>
              <option value="DONE">Terminée</option>
            </select>
            <Search placeholder="Rechercher une tâche" />
          </div>
        </div>
        <div className={styles.detailContentList}>
          {project.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};
