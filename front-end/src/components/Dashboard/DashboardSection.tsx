"use client";

import { useState, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import styles from "./DashboardSection.module.scss";
import { Button } from "@/components/buttons/Button/Button";
import Greeting from "@/components/Greeting/Greeting";
import { Chips } from "@/components/Chips/Chips";
import { ProjectModal } from "@/components/Modal/ProjectModal/ProjectModal";
import { Search } from "@/components/Inputs/Search";
import type { Task } from "@/types/Task";
import { getAssignedTasks } from "@/services/dashService";
import { sortTasks } from "@/utils/tasks";
import DashTaskCard from "../Cards/DashTaskCard/DashTaskCard";
import { Modal } from "../Modal/Modal";
import { TaskCard } from "../Cards/TaskCard/TaskCard";

export function DashboardSection() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [viewedTask, setViewedTask] = useState<Task | null>(null);
  const taskTitleId = useId();
  const router = useRouter();

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
        <Chips label="Liste" source="/icon_my_tasks.svg" />
        <Chips label="Kanban" source="/icon_kanban.svg" />
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
        {visibleTasks.map((task) => (
          <div key={task.id} className={styles.dashCardContainer}>
            <DashTaskCard task={task} onView={() => setViewedTask(task)} />
          </div>
        ))}
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
      {isCreateOpen && (
        <ProjectModal
          onClose={() => setIsCreateOpen(false)}
          onCreated={() => router.push("/projects")}
        />
      )}
    </div>
  );
}
