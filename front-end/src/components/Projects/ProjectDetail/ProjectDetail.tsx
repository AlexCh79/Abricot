"use client";
import { useState, useEffect, useId } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getProject } from "@/services/projectService";
import { getTasks } from "@/services/taskService";
import type { ProjectWithTasks } from "@/types/ProjectsWithTasks";
import { BackButton } from "@/components/buttons/IconButton/IconButton";
import styles from "./ProjectDetail.module.scss";
import { Button } from "@/components/buttons/Button/Button";
import { SquareIaButton } from "@/components/buttons/IaButton/IaButton";
import { countTeam } from "@/utils/team";
import { ProjectModal } from "@/components/Modal/ProjectModal/ProjectModal";
import { TaskModal } from "@/components/Modal/TaskModal/TaskModal";
import {
  Chips,
  UserInitials,
  UserChip,
  OwnerChip,
  OwnerInitials,
} from "@/components/Chips/Chips";
import { sortTasks } from "@/utils/tasks";
import { Search } from "@/components/Inputs/Search";
import { TaskCard } from "@/components/Cards/TaskCard/TaskCard";
import type { Task, TaskStatus } from "@/types/Task";
import KanbanBoard from "@/components/Kanban/KanbanBoard";
import { Modal } from "@/components/Modal/Modal";

type ProjectDetailProps = {
  projectId: string;
};

export const ProjectDetail = ({ projectId }: ProjectDetailProps) => {
  const [project, setProject] = useState<ProjectWithTasks | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTaskCreateOpen, setIsTaskCreateOpen] = useState(false);
  const router = useRouter();
  const [viewedTask, setViewedTask] = useState<Task | null>(null);
  const taskTitleId = useId();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "">("");
  const [search, setSearch] = useState("");
  const assignableUsers = [
    ...(project?.owner ? [project.owner] : []),
    ...(project?.members.map((member) => member.user) ?? []),
  ];

  // Choix de la vue
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const view = searchParams.get("view") === "kanban" ? "kanban" : "list";

  const changeView = (next: "list" | "kanban") => {
    const params = new URLSearchParams(searchParams);
    if (next === "kanban") params.set("view", "kanban");
    else params.delete("view");
    router.replace(`${pathname}?${params}`, { scroll: false });
  };

  const handleTaskUpdated = (updated: Task) => {
    setProject((current) =>
      current
        ? {
            ...current,
            tasks: current.tasks.map((task) =>
              task.id === updated.id ? updated : task,
            ),
          }
        : current,
    );
  };

  const handleTaskDeleted = (taskId: string) => {
    setProject((current) =>
      current
        ? {
            ...current,
            tasks: current.tasks.filter((task) => task.id !== taskId),
          }
        : current,
    );
  };

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

  const statuses: TaskStatus[] = statusFilter
    ? [statusFilter]
    : ["TODO", "IN_PROGRESS", "DONE"];

  const visibleTasks = sortTasks(
    project.tasks.filter((task) => {
      const matchesStatus = statusFilter
        ? task.status === statusFilter
        : task.status !== "CANCELLED";
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return matchesStatus && matchesSearch;
    }),
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
          <Button
            label="Créer une tâche"
            type="button"
            onClick={() => setIsTaskCreateOpen(true)}
          />
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
              <Chips
                label="Liste"
                source="/icon_my_tasks.svg"
                isActive={view === "list"}
                onClick={() => changeView("list")}
              />
              <Chips
                label="Kanban"
                source="/icon_kanban.svg"
                isActive={view === "kanban"}
                onClick={() => changeView("kanban")}
              />
            </div>
            <select
              className={styles.detailContentBannerSelectStatus}
              value={statusFilter}
              aria-label="Filtrer les tâches par statut"
              onChange={(e) =>
                setStatusFilter(e.target.value as TaskStatus | "")
              }
            >
              <option value="">Toutes sauf annulées</option>
              <option value="TODO">À faire</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="DONE">Terminée</option>
              <option value="CANCELLED">Annulées</option>
            </select>
            <Search placeholder="Rechercher une tâche" onSearch={setSearch} />
          </div>
        </div>
        <div className={styles.detailContentList}>
          {view === "kanban" ? (
            <KanbanBoard
              tasks={visibleTasks}
              statuses={statuses}
              onViewTask={setViewedTask}
              headingLevel="h4"
              showProject={false}
            />
          ) : visibleTasks.length === 0 ? (
            <p>
              {project.tasks.length === 0
                ? "Aucune tâche dans ce projet pour le moment."
                : "Aucune tâche ne correspond à votre recherche."}
            </p>
          ) : (
            visibleTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => setEditingTask(task)}
              />
            ))
          )}
        </div>
      </div>
      {isTaskCreateOpen && (
        <TaskModal
          projectId={project.id}
          assignableUsers={assignableUsers}
          onClose={() => setIsTaskCreateOpen(false)}
        />
      )}
      {editingTask && (
        <TaskModal
          projectId={project.id}
          assignableUsers={assignableUsers}
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdated={handleTaskUpdated}
          onDeleted={() => handleTaskDeleted(editingTask.id)}
        />
      )}
      {viewedTask && (
        <Modal
          onClose={() => setViewedTask(null)}
          labelledBy={taskTitleId}
          withCloseButton
        >
          <TaskCard task={viewedTask} titleId={taskTitleId} />
        </Modal>
      )}
    </div>
  );
};
