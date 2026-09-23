import { apiFetch } from "./api";
import { setCookie } from "../utils/cookies";

// Connexion utilisateur
export async function login(email, password) {
  const body = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  // Stockage du token dans un cookie
  setCookie("token", body.data.token, 7);
  return body.data.user;
}
