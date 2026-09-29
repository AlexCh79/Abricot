import { ProjectCard } from "@/components/Cards/ProjectCard/ProjectCard";
import styles from "./ProjectList.module.scss";
import type { ProjectWithTasks } from "@/types/ProjectsWithTasks";

type ProjectListProps = {
  projects: ProjectWithTasks[];
  isLoading: boolean;
  error: string;
};

export const ProjectList = ({
  projects,
  isLoading,
  error,
}: ProjectListProps) => {
  if (isLoading) return <p>Chargement de vos projets...</p>;
  if (error)
    return (
      <p role="alert" className={styles.errorText}>
        {error}
      </p>
    );
  if (projects.length === 0)
    return <p>Vous n&apos;avez pas encore de projet.</p>;

  return (
    <ul className={styles.list}>
      {projects.map((project) => (
        <li key={project.id} className={styles.listItem}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
};
