"use client";

import styles from "./ProjectModal.module.scss";
import Image from "next/image";
import { Button } from "../buttons/Button/Button";
import { Modal } from "./Modal";
import { useEffect, useState } from "react";
import { createProject } from "@/services/projectService";
import { ProjectWithTasks } from "@/types/ProjectsWithTasks";
import { User } from "@/types/User";
import { searchUsers } from "@/services/userService";

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (project: ProjectWithTasks) => void;
};

export function ProjectModal({
  isOpen,
  onClose,
  onCreated,
}: ProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  // States pour la recherche d'email utilisateurs
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<User[]>([]);

  // Recherche de mail utilisateur dès 3 caractères tapés
  useEffect(() => {
    if (query.trim().length < 2) return; // 1 caractère, pas de recherche

    const timer = setTimeout(() => {
      const search = async () => {
        try {
          setSuggestions(await searchUsers(query));
        } catch {
          setSuggestions([]);
        }
      };
      search();
    }, 300);
    return () => clearTimeout(timer);
  }, [query]); // Déclenchement uniquement à la frappe

  // Pas de suggestions si saisie trop courte
  const visibleSuggestions = query.trim().length >= 2 ? suggestions : [];

  // Création du projet
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      // Création du projet
      const created = await createProject({ name, description });
      onCreated({ ...created, tasks: [] });
      // Nettoyage des champs
      setName("");
      setDescription("");
      setQuery("");
      onClose();
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Création impossible.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="project-modal-title">
      <form className={styles.projectModalPage} onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className={styles.closedZone}
        >
          <Image
            src="/icon_cross.svg"
            width={15}
            height={15}
            className={styles.crossIcon}
            alt=""
          />
        </button>
        <div className={styles.projectModalContent}>
          <div className={styles.projectModalFormContent}>
            <h1 id="project-modal-title" className={styles.projectModalTitle}>
              Créer un projet
            </h1>
            <div className={styles.projectModalGroupFields}>
              <div className={styles.projectModalGroup}>
                <label htmlFor="name" className={styles.projectModalLabel}>
                  Titre*
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  className={styles.projectModalTextInput}
                />
              </div>
              <div className={styles.projectModalGroup}>
                <label
                  htmlFor="description"
                  className={styles.projectModalLabel}
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  maxLength={500}
                  className={styles.projectModalTextInput}
                />
              </div>
              <div className={styles.projectModalGroup}>
                <label
                  htmlFor="contributors"
                  className={styles.projectModalLabel}
                >
                  Contributeurs
                </label>
                <input
                  id="contributors"
                  name="contributors"
                  list="contributors-suggestions"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Choisir un ou plusieurs collaborateurs"
                  className={styles.projectModalSelectInput}
                />
                <datalist id="contributors-suggestions">
                  {visibleSuggestions.map((user) => (
                    <option key={user.id} value={user.email}>
                      {user.name ?? user.email}
                    </option>
                  ))}
                </datalist>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.btnZone}>
          {error && (
            <p role="alert" className={styles.errorText}>
              {error}
            </p>
          )}
          <Button
            label={isSaving ? "Création..." : "Ajouter un projet"}
            type="submit"
            disabled={isSaving}
          />
          {/* <Button label="Supprimer un projet" type="button" /> */}
        </div>
      </form>
    </Modal>
  );
}
