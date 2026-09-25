// Utilitaire pour séparer le nom et prénom venant de l'API et renvoyer un seul nom depuis le client

// Séparation du prénom et du nom. Ce qui est avant l'espace devient le prénom, ce qui est après le nom
export function splitName(name: string | null): {
  firstName: string;
  lastName: string;
} {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  const [firstName = "", ...rest] = parts;

  return { firstName, lastName: rest.join(" ") };
}

// Jointure entre les deux champs client : prénom et nom
export function joinName(firstName: string, lastName: string): string {
  return [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");
}

// Récupération des initiales
export function getInitials(name: string | null): string {
  const { firstName, lastName } = splitName(name); // Découpage du nom
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
}
