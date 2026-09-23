"use client";

import { usePathname } from "next/navigation";
import styles from "./UserButton.module.scss";
import Link from "next/link";

//Initiales en dur en attendant récupération données API
export const UserButton = () => {
  const pathName = usePathname();
  const isActive = pathName.startsWith("/profile");
  return (
    <Link
      href="/profile"
      className={styles.BtnUser}
      aria-current={isActive ? "page" : undefined}
    >
      <span className={styles.initials}>AD</span>
    </Link>
  );
};
