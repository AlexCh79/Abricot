import { apiFetch } from "./api";
import type { User } from "@/types/User";

// Récupération des utilisateurs par mail
export async function searchUsers(query: string): Promise<User[]> {
  const body = await apiFetch(
    `/users/search?query=${encodeURIComponent(query)}`,
    { method: "GET" },
  );

  return body.data.users;
}
