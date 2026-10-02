import type { Metadata } from "next";
import { Suspense } from "react";
import { DashboardSection } from "@/components/Dashboard/DashboardSection";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Tableau de bord",
};
export default function Dashboard() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <DashboardSection />
    </Suspense>
  );
}
