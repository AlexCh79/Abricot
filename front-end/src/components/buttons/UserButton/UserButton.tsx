"use client";

import { usePathname } from "next/navigation";
import styles from "./UserButton.module.scss";
import Link from "next/link";
import { getInitials } from "@/utils/name";
import { useUser } from "@/context/UserContext";

export const UserButton = () => {
  const { user } = useUser();
  const initials = getInitials(user?.name ?? null) || "?";

  const pathName = usePathname();
  const isActive = pathName.startsWith("/profile");
  return (
    <Link
      href="/profile"
      className={styles.BtnUser}
      aria-current={isActive ? "page" : undefined}
    >
      <span className={styles.initials}>{initials}</span>
    </Link>
  );
};
