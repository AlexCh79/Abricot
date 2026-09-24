import type { Metadata } from "next";
import { Button } from "@/components/buttons/Button/Button";
import styles from "./Dashboard.module.scss";
import Greeting from "@/components/Greeting/Greeting";
import { Chips } from "@/components/Chips/Chips";
import { Search } from "@/components/Inputs/Search";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Tableau de bord",
};
export default function Dashboard() {
  return (
    <div className={styles.dashboardPage}>
      <div className={styles.dashboardHeader}>
        <div className={styles.dashboardTitleWrapper}>
          <h1 className={styles.dashboardTitle}>Tableau de bord</h1>
          <Greeting className={styles.dashboardSubtitle} />
        </div>
        <Button type="button" label="+ Créer un projet" />
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
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
}
