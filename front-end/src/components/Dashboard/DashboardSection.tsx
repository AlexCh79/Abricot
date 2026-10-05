"use client";

import { useState, useEffect, useId } from "react";
import styles from "./DashboardSection.module.scss";
import { Button } from "@/components/buttons/Button/Button";
import Greeting from "@/components/Greeting/Greeting";
import { Chips } from "@/components/Chips/Chips";
import { ProjectModal } from "@/components/Modal/ProjectModal/ProjectModal";
import { Search } from "@/components/Inputs/Search";
import type { Task } from "@/types/Task";
import type { User } from "@/types/User";
import { getAssignedTasks } from "@/services/dashService";
import { sortTasks } from "@/utils/tasks";
import DashTaskCard from "../Cards/DashTaskCard/DashTaskCard";
import { Modal } from "../Modal/Modal";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { TaskCard } from "../Cards/TaskCard/TaskCard";
import KanbanBoard from "../Kanban/KanbanBoard";
import Image from "next/image";
import { getProject } from "@/services/projectService";
import { TaskModal } from "../Modal/TaskModal/TaskModal";

export function DashboardSection() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [viewedTask, setViewedTask] = useState<Task | null>(null);
  const taskTitleId = useId();
  const router = useRouter();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [assignableUsers, setAssignableUsers] = useState<
    Pick<User, "id" | "name" | "email">[]
  >([]);
  const [isPreparingEdit, setIsPreparingEdit] = useState(false);

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

  // Récupération des tâches
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setTasks(await getAssignedTasks());
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erreur lors du chargement des projets.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  // Tri des tâches par priorité
  const visibleTasks = sortTasks(
    tasks.filter((task) =>
      task.title.toLowerCase().includes(search.trim().toLowerCase()),
    ),
  );

  // Ouverture de la modale de tâche (visualisation ou modification)
  const openEdit = async (task: Task) => {
    setIsPreparingEdit(true);
    try {
      const project = await getProject(task.projectId);
      setAssignableUsers([
        ...(project.owner ? [project.owner] : []),
        ...project.members.map((m) => m.user),
      ]);
      setViewedTask(null);
      setEditingTask(task);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chargement impossibles.");
    } finally {
      setIsPreparingEdit(false);
    }
  };

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.dashboardHeader}>
        <div className={styles.dashboardTitleWrapper}>
          <h1 className={styles.dashboardTitle}>Tableau de bord</h1>
          <Greeting className={styles.dashboardSubtitle} />
        </div>
        <Button
          type="button"
          label="+ Créer un projet"
          onClick={() => setIsCreateOpen(true)}
        />
      </div>
      <div className={styles.btnBar}>
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
      <div className={styles.dashboardContent}>
        <div className={styles.dashboardContentHead}>
          <div className={styles.dashboardContentTitleBar}>
            <h2 className={styles.dashboardContentTitle}>
              Mes tâches assignées
            </h2>
            <p className={styles.dashboardContentSubtitle}>
              Par ordre de priorité
            </p>
          </div>
          <div className={styles.searchBar}>
            <Search
              placeholder="Rechercher une tâche..."
              onSearch={setSearch}
            />
          </div>
        </div>
        {isLoading && <p>Chargement de vos tâches...</p>}

        {error && (
          <p role="alert" className={styles.errorText}>
            {error}
          </p>
        )}

        {!isLoading && !error && visibleTasks.length === 0 && (
          <p>
            {tasks.length === 0
              ? "Aucune tâche ne vous est assignée pour le moment."
              : "Aucune tâche ne correspond à votre recherche."}
          </p>
        )}

        {view === "kanban" ? (
          <KanbanBoard
            tasks={visibleTasks}
            statuses={["TODO", "IN_PROGRESS", "DONE"]}
            onViewTask={setViewedTask}
          />
        ) : (
          visibleTasks.map((task) => (
            <div key={task.id} className={styles.dashCardContainer}>
              <DashTaskCard task={task} onView={() => setViewedTask(task)} />
            </div>
          ))
        )}

        {viewedTask && (
          <Modal
            onClose={() => setViewedTask(null)}
            labelledBy={taskTitleId}
            withCloseButton
          >
            <button
              type="button"
              onClick={() => openEdit(viewedTask)}
              disabled={isPreparingEdit}
              className={styles.editTaskButton}
            >
              <Image
                src="/icon_modify.svg"
                alt=""
                aria-hidden="true"
                width={16}
                height={14}
              />
              Modifier
            </button>
            <TaskCard task={viewedTask} titleId={taskTitleId} />
          </Modal>
        )}
      </div>
      {editingTask && (
        <TaskModal
          projectId={editingTask.projectId}
          assignableUsers={assignableUsers}
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdated={(updated) => {
            setTasks((current) =>
              current.map((t) => (t.id === updated.id ? updated : t)),
            );
            setEditingTask(null);
          }}
          onDeleted={() => {
            setTasks((current) =>
              current.filter((t) => t.id !== editingTask.id),
            );
            setEditingTask(null);
          }}
        />
      )}
      {isCreateOpen && (
        <ProjectModal
          onClose={() => setIsCreateOpen(false)}
          onCreated={() => router.push("/projects")}
        />
      )}
    </div>
  );
}
