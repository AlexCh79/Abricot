"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { User } from "@/types/User";
import { getProfile } from "@/services/authService";

type UserContextValue = {
  user: User | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
};

const UserContext = createContext<UserContextValue | null>(null);

// Récupération du profil
async function fetchProfile(): Promise<User | null> {
  try {
    return await getProfile();
  } catch {
    return null;
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setUser(await fetchProfile());
      setIsLoading(false);
    };
    load();
  }, []);

  const refresh = useCallback(async () => {
    setUser(await fetchProfile());
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, refresh }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook pour faciliter l'utilisation du context dans les autres composants.
export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser doit être utilisé dans un <Provider>");
  }

  return context;
}
