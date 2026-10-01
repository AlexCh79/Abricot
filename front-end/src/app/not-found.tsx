import styles from "./not-found.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <Image
        src="/logo_orange.svg"
        alt="Abricot"
        width={252}
        height={32}
        className={styles.logo}
      />
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <h1 className={styles.title}>Cette page n&apos;existe pas</h1>
      <p className={styles.message}>
        Le lien peut être erroné ou avoir été déplacé.
      </p>
      <Link href="/dashboard" className={styles.link}>
        Retour au tableau de bord
      </Link>
    </main>
  );
}
