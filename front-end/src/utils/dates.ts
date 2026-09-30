// Format de date

// Date dd/mmmm
export function formatDueDate(date: string | null): string {
  if (!date) return "Aucune";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });
}

// Date et heure (pour les commentaires)
export function commentDate(date: string | null): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  });
}
