import type { Metadata } from "next";
import styles from "./Projects.module.scss";
import { Button } from "@/components/buttons/Button/Button";

export const metadata: Metadata = {
  title: "Projets",
  description: "Liste des projets de l'utilisateur",
};

export default function Projects() {
  return (
    <div className={styles.projectsPage}>
      <div className={styles.projectsHeader}>
        <div className={styles.projectsTitleWrapper}>
          <h1 className={styles.projectsTitle}>Mes projets</h1>
          <p className={styles.projectsSubtitle}>Gérez vos projets</p>
        </div>
        <Button type="button" label="+ Créer un projet" />
      </div>
    </div>
  );
}
