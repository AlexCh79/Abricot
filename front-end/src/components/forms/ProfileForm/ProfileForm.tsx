"use client";

import styles from "./ProfileForm.module.scss";
import { useState, useEffect } from "react";
import LogoutForm from "../LogoutForm/LogoutForm";
import { Button } from "@/components/buttons/Button/Button";
import { getProfile } from "@/services/authService";
import type { User } from "@/types/User";

export default function ProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user: User = await getProfile();
        setName(user.name ?? "");
        setEmail(user.email ?? "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Profil indisponible");
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileFormTitleWrapper}>
        <h1 className={styles.profileFormTitle}>Mon compte</h1>
        <span className={styles.profileFormSubtitle}>{name}</span>
      </div>
      <form
        className={styles.profileForm}
        aria-busy={isLoading}
        onSubmit={handleSubmit}
      >
        <div className={styles.profileFormGroupField}>
          <label className={styles.profileFormLabel} htmlFor="name">
            Nom
          </label>
          <input
            className={styles.profileInput}
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.profileFormGroupField}>
          <label className={styles.profileFormLabel} htmlFor="email">
            Email
          </label>
          <input
            className={styles.profileInput}
            id="email"
            name="email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.profileFormGroupField}>
          <label className={styles.profileFormLabel} htmlFor="password">
            Mot de passe
          </label>
          <input
            className={styles.profileInput}
            id="password"
            name="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="●●●●●●●●●●●"
          />
        </div>
        {error && (
          <span role="alert" className={styles.errorText}>
            {error}
          </span>
        )}
        <div className={styles.btnWrapper}>
          <Button type="submit" label="Modifier les informations" />
          <LogoutForm />
        </div>
      </form>
    </div>
  );
}
