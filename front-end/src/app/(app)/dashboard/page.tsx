import type { Metadata } from "next";
import { Button } from "@/components/buttons/Button/Button";
import styles from "./Dashboard.module.scss";
import Greeting from "@/components/Greeting/Greeting";

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
    </div>
  );
}
