"use client";

import styles from "./ProfileForm.module.scss";
import { useState } from "react";
import LogoutForm from "../LogoutForm/LogoutForm";
import { Button } from "@/components/buttons/Button/Button";

export default function ProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileFormTitleWrapper}>
        <h5 className={styles.profileFormTitle}>Mon compte</h5>
        <span className={styles.profileFormSubtitle}>{name}</span>
      </div>
      <form className={styles.profileForm} onSubmit={handleSubmit}>
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
            placeholder={name}
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
            placeholder={email}
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
        {error && <span className={styles.errorText}>{error}</span>}
      </form>
      <div className={styles.btnWrapper}>
        <Button type="submit" label="Modifier les informations" />
        <LogoutForm />
      </div>
    </div>
  );
}
