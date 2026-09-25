import type { Project } from "./Project";
import type { Task } from "./Task";

// Type spécifique pour récupérer (et compter) toutes les tâches d'un projet, affectées à l'utilisateur ou non
export type ProjectWithTasks = Project & { tasks: Task[] };
