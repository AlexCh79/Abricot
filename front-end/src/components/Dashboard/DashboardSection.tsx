"use client";

import { useState, useEffect } from "react";
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

export function DashboardSection() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // Récupération des projets et des tâches affiliées
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
