import { API_URL } from "../config/api";
import { getCookie } from "../utils/cookies";

export async function apiFetch(path, options = {}) {
  // Récupération du token stocké dans le cookie
  const token = getCookie("token");

  // Récupération des headers existants
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Stockage du token dans le header
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Création du endpoint selon le chemin donné
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  // Récupération de la réponse de l'API
  const body = await response.json();

  // Message d'erreur si pas de réponse
  if (!response.ok) {
    throw new Error(body.message || "Une erreur est survenue");
  }

  // Si tout est ok, renvoie vers le cliennt
  return body;
}
