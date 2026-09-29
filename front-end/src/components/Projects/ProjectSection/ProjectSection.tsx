"use client";
import { useState } from "react";
import styles from "./ProjectSection.module.scss";
import { ProjectModal } from "@/components/Modal/ProjectModal";
import { Button } from "@/components/buttons/Button/Button";
import { ProjectList } from "../ProjectList/ProjectList";

export function ProjectSection() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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
        <ProjectList />
      </div>
      <ProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}
