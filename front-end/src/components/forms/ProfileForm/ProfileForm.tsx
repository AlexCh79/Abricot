"use client";

import styles from "./ProfileForm.module.scss";
import { useState, useEffect } from "react";
import LogoutForm from "../LogoutForm/LogoutForm";
import { Button } from "@/components/buttons/Button/Button";
import {
  getProfile,
  updateProfile,
  updatePassword,
} from "@/services/authService";
import type { User } from "@/types/User";
import { splitName, joinName } from "@/utils/name";

export default function ProfileForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user: User = await getProfile();
        const { firstName, lastName } = splitName(user.name);
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(user.email);
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
    setSuccess("");

    // Changement du mot de passe à part (deux requêtes séparées dans l'API)
    const wantsPasswordChange = currentPassword !== "" || newPassword !== "";
    if (wantsPasswordChange && (currentPassword === "" || newPassword === "")) {
      setError(
        "Pour changer de mot de passe, veuillez renseigner le mot de passe actuel et le nouveau.",
      );
      return;
    }

    try {
      if (wantsPasswordChange) {
        await updatePassword({ currentPassword, newPassword });
        setCurrentPassword("");
        setNewPassword("");
      }

      const user = await updateProfile({
        name: joinName(firstName, lastName),
        email,
      });
      const names = splitName(user.name);
      setFirstName(names.firstName);
      setLastName(names.lastName);
      setEmail(user.email);
      setSuccess(
        wantsPasswordChange
          ? "Vos informations et votre mot de passe ont bien été mis à jour."
          : "Vos informations ont bien été mises à jour.",
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur dans la mise à jour des données.",
      );
    }
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileFormTitleWrapper}>
        <h1 className={styles.profileFormTitle}>Mon compte</h1>
        <span className={styles.profileFormSubtitle}>
          {joinName(firstName, lastName)}
        </span>
      </div>
      <form
        className={styles.profileForm}
        aria-busy={isLoading}
        onSubmit={handleSubmit}
      >
        <div className={styles.profileFormGroupField}>
          <label className={styles.profileFormLabel} htmlFor="lastName">
            Nom
          </label>
          <input
            className={styles.profileInput}
            id="lastName"
            name="lastName"
            value={lastName}
            autoComplete="family-name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles.profileFormGroupField}>
          <label className={styles.profileFormLabel} htmlFor="firstName">
            Prénom
          </label>
          <input
            className={styles.profileInput}
            id="firstName"
            name="firstName"
            value={firstName}
            autoComplete="given-name"
            onChange={(e) => setFirstName(e.target.value)}
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
          <label className={styles.profileFormLabel} htmlFor="currentPassword">
            Mot de passe actuel
          </label>
          <input
            className={styles.profileInput}
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            type="password"
            autoComplete="current-password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="●●●●●●●●●●●"
          />
        </div>
        <div className={styles.profileFormGroupField}>
          <label className={styles.profileFormLabel} htmlFor="newPassword">
            Nouveau mot de passe
          </label>
          <input
            className={styles.profileInput}
            id="newPassword"
            name="newPassword"
            value={newPassword}
            autoComplete="new-password"
            type="password"
            aria-describedby="password-hint"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <p id="password-hint" className={styles.passwordHint}>
            8 caractères minimum, avec une majuscule, une minuscule, un chiffre
            et un caractère spécial (@$!%*?&). Laissez vide pour ne pas le
            changer.
          </p>
        </div>
        {error && (
          <span role="alert" className={styles.errorText}>
            {error}
          </span>
        )}
        {success && (
          <span role="status" className={styles.successText}>
            {success}
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
