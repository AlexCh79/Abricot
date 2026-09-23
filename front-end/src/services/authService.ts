import { apiFetch } from "./api";
import { setCookie, deleteCookie } from "../utils/cookies";

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
