"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./RegisterForm.module.scss";
import Link from "next/link";
import { Button } from "@/components/buttons/Button/Button";
import { register } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await register(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue, inscription impossible.",
      );
    }
  };

  return (
    <div className={styles.loginPage}>
      <Image
        src="/images/register.webp"
        alt=""
        aria-hidden="true"
        fill
        className={styles.loginBg}
      />
      <div className={styles.loginColumn}>
        <Image
          className={styles.loginLogo}
          alt="Abricot"
          src="/logo_orange.svg"
          width={252.57}
          height={32.17}
        />
        <form className={styles.loginForm} onSubmit={handleRegister}>
          <h1 className={styles.loginFormTitle}>Inscription</h1>
          <div className={styles.loginFormGroupField}>
            <div className={styles.loginFormGroupFields}>
              <div className={styles.loginFormGroup}>
                <label htmlFor="email" className={styles.loginLabel}>
                  Email
                </label>
                <input
                  className={styles.loginInput}
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.loginFormGroup}>
                <label htmlFor="password" className={styles.loginLabel}>
                  Mot de passe
                </label>
                <input
                  className={styles.loginInput}
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  aria-describedby="password-hint"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p id="password-hint" className={styles.passwordHint}>
                  8 caractères minimum, avec une majuscule, une minuscule, un
                  chiffre et un caractère spécial (@$!%*?&).
                </p>
              </div>
              {error && (
                <span role="alert" className={styles.errorText}>
                  {error}
                </span>
              )}
              <Button label="S'inscrire" type="submit" />
            </div>
          </div>
        </form>
        <div className={styles.loginBottom}>
          <span className={styles.loginBottomText}>
            Déjà inscrit ?{" "}
            <Link href="/login" className={styles.loginLink}>
              Se connecter
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
