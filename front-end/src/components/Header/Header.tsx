import Link from "next/link";
import Image from "next/image";
import styles from './Header.module.scss';
import { DashButton, FileButton } from "../buttons/HeadButton/HeadButton";
import { UserButton } from "../buttons/UserButton/UserButton";

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
                <DashButton />
                <FileButton />
            </nav>
            <div className="header__account">
                <UserButton />
            </div>
        </header>
    )
}