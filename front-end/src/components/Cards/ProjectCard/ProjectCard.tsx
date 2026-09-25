import Link from "next/link";
import Image from "next/image";
import styles from "./ProjectCard.module.scss";
import { countTeam } from "@/utils/team";
import { getInitials } from "@/utils/name";
import { getProgress } from "@/utils/tasks";
import { ProjectWithTasks } from "@/types/ProjectsWithTasks";

type ProjectCardProps = {
  project: ProjectWithTasks;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { done, total, percent } = getProgress(project.tasks);
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
          <span className={styles.cardProgressPercent}>{percent}%</span>
        </div>
        <div className={styles.cardProgressRangeWrapper}>
          <div
            className={styles.cardProgressRange}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progression du projet ${project.name}`}
          >
            <span
              className={styles.cardProgressFill}
              style={{ width: `${percent}%` }}
            />
          </div>

          <span className={styles.cardTasksRange}>
            {done} / {total} tâches terminées
          </span>
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
          <span className={styles.teamCount}>
            Équipe ({countTeam(project)})
          </span>
        </div>
        <div className={styles.teamTagsWrapper}>
          <div className={styles.teamPropertyTags}>
            <div className={styles.teamPropertyUserIcon}>
              {getInitials(project.owner?.name ?? null)}
            </div>
            <div className={styles.teamPropertyTag}>Propriétaire</div>
          </div>
          <div className={styles.memberTagTeamWrapper}>
            {project.members.map((member) => (
              <div key={member.id} className={styles.memberTagTeam}>
                {getInitials(member.user.name)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
