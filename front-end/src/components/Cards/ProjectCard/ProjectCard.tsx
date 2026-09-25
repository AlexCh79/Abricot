import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/Project";
import styles from "./ProjectCard.module.scss";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTitleWrapper}>
        <h3 className={styles.cardTitle}>
          <Link href={`/projects/${project.id}`} className={styles.projectLink}>
            {project.name}
          </Link>
        </h3>
        {project.description && (
          <p className={styles.cardSubtitle}>{project.description}</p>
        )}
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardProgressWrapper}>
          <span className={styles.cardProgressText}>Progression</span>
          <span className={styles.cardProgressPercent}>0%</span>
        </div>
        <div className={styles.cardProgressRangeWrapper}>
          <span className={styles.cardProgressRange}></span>
          <span className={styles.cardTasksRange}>0 / 2 tâches terminées</span>
        </div>
      </div>
      <div className={styles.cardBottom}>
        <div className={styles.teamNumberWrapper}>
          <Image
            src="/icon_team.svg"
            width={12}
            height={11}
            className={styles.icon}
            aria-hidden="true"
            alt=""
          />
          <span className={styles.teamCount}>Équipe (3)</span>
        </div>
        <div className={styles.teamTagsWrapper}>
          <div className={styles.teamPropertyTags}>
            <div className={styles.teamPropertyUserIcon}>AD</div>
            <div className={styles.teamPropertyTag}>Propriétaire</div>
          </div>
          <div className={styles.memberTagTeamWrapper}>
            <div className={styles.memberTagTeam}>AC</div>
            <div className={styles.memberTagTeam}>BE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
