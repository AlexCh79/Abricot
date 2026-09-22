import Link from "next/link";
import Image from "next/image";
import styles from './Header.module.scss';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper}>
                <Image 
                    src='/logo_orange.svg'
                    height={18.72}
                    width={147}
                    alt="Abricot"
                    className={styles.logo}
                />
            </div>
            <nav aria-label="Navigation principale" className={styles.navbar}>
                <Link href="/dashboard" aria-label="vers le tableau de bord" className={styles.Link}>Tableau de Bord</Link>
                <Link href="/projects" aria-label="vers les projets" className={styles.Link}>Projets</Link>
            </nav>
            <div className="header__account">
                <Link href="/account" aria-label="Vers mon compte" className={styles.Link}>Mon compte</Link>
            </div>
        </header>
    )
}