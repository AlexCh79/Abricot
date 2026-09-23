import { apiFetch } from "./api";
import { setCookie, deleteCookie } from "../utils/cookies";
import type { User } from "@/types/User";

// Connexion utilisateur
export async function login(email: string, password: string) {
  const body = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  // Stockage du token dans un cookie
  setCookie("token", body.data.token, 7);
  return body.data.user;
}

// Déconnexion utilisateur
export async function logout() {
  deleteCookie("token");
}

// Inscription utilisateur
export async function register(email: string, password: string) {
  const body = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  // Création du token et stockage
  setCookie("token", body.data.token, 7);
  return body.data.user;
}

// Récupération des informations utilisateur
export async function getProfile(): Promise<User> {
  const body = await apiFetch("/auth/profile", {
    method: "GET",
  });

  return body.data.user;
}

// Modification des informations utilisateur
export async function updateProfile(data: {
  email?: string | null;
  name?: string | null;
}): Promise<User> {
  const body = await apiFetch("/auth/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return body.data.user;
}

// Modification du mot de passe
export async function updatePassword(data: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  await apiFetch("/auth/password", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
