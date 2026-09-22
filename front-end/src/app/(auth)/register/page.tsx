import Image from "next/image";
import styles from "./Register.module.scss";
import Link from "next/link";
import { Button } from "@/components/buttons/Button/Button";;

export default function Register() {
    return (
        <div className={styles.loginPage}>
            <Image src="/images/register.webp" alt="" aria-hidden="true" fill className={styles.loginBg} />
            <div className={styles.loginColumn}>
                <Image className={styles.loginLogo} alt="Abricot" src="/logo_orange.svg" width={252.57} height={32.17} />
                <form className={styles.loginForm}>
                    <h1 className={styles.loginFormTitle}>Inscription</h1>
                    <div className={styles.loginFormGroupField}>
                        <div className={styles.loginFormGroupFields}>
                            <div className={styles.loginFormGroup}>
                                <label htmlFor="email" className={styles.loginLabel}>Email</label>
                                <input className={styles.loginInput} type="email" id="email" name="email" autoComplete="email" required />
                            </div>
                            <div className={styles.loginFormGroup}>
                                <label htmlFor="password" className={styles.loginLabel}>Mot de passe</label>
                                <input className={styles.loginInput} type="password" id="password" name="password" autoComplete="newPassword" required />
                            </div>
                            <Button label="S'inscrire" />
                        </div>
                    </div>
                </form>
                <div className={styles.loginBottom}>
                    <span className={styles.loginBottomText}>Déjà inscrit ? <Link href="/login" className={styles.loginLink}>Se connecter</Link></span>
                </div>
            </div>
        </div>
    )
}