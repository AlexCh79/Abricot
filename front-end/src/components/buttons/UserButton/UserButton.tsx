import styles from "./UserButton.module.scss";
import Link from "next/link";

//Initiales en dur en attendant récupération données API
export const UserButton = () => {
  return (
    <Link href="/account" className={styles.BtnUser}>
      <span className={styles.initials}>AD</span>
    </Link>
  );
};
