"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Login.module.scss";
import Link from "next/link";
import { Button } from "@/components/buttons/Button/Button";
import { login } from "@/services/authService";

export default function Login() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "L'identifiant ou le mot de passe sont erronés.",
      );
    }
  };

  return (
    <div className={styles.loginPage}>
      <Image
        src="/images/login.webp"
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
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h1 className={styles.loginFormTitle}>Connexion</h1>
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
                  value={email}
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="Votre adresse mail"
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
                  autoComplete="current-password"
                  required
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <span role="alert" className={styles.errorText}>
                  {error}
                </span>
              )}
              <Button label="Se Connecter" />
            </div>
            <Link href="/" className={styles.forgotPassword}>
              Mot de passe oublié?
            </Link>
          </div>
        </form>
        <div className={styles.loginBottom}>
          <span className={styles.loginBottomText}>
            Pas encore de compte ?{" "}
            <Link href="/register" className={styles.loginLink}>
              Créer un compte
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
