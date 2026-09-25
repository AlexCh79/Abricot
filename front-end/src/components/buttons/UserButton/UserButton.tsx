"use client";

import { usePathname } from "next/navigation";
import styles from "./UserButton.module.scss";
import Link from "next/link";
import { getInitials } from "@/utils/name";
import { getProfile } from "@/services/authService";
import { User } from "@/types/User";
import { useEffect, useState } from "react";

//Initiales en dur en attendant récupération données API
export const UserButton = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const profile: User = await getProfile();
        setName(profile.name ?? "");
      } catch {}
    };
    loadUser();
  }, []);

  const pathName = usePathname();
  const isActive = pathName.startsWith("/profile");
  return (
    <Link
      href="/profile"
      className={styles.BtnUser}
      aria-current={isActive ? "page" : undefined}
    >
      <span className={styles.initials}>{getInitials(name) || "?"}</span>
    </Link>
  );
};
