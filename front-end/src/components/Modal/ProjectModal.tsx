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
import { getInitials } from "@/utils/name";

type ProjectModalProps = {
  project?: ProjectWithTasks;
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
  // Gestion des contributeurs multiples
  const [contributors, setContributors] = useState<string[]>([]);

  // Sélection et déselection des contributeurs
  const toggleContributor = (email: string) => {
    setContributors((current) =>
      current.includes(email)
        ? current.filter((item) => item !== email)
        : [...current, email],
    );
  };

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
      const created = await createProject({ name, description, contributors });
      onCreated({ ...created, tasks: [] });
      // Nettoyage des champs
      setName("");
      setDescription("");
      setQuery("");
      onClose();
      setContributors([]);
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
            <h2 id="project-modal-title" className={styles.projectModalTitle}>
              Créer un projet
            </h2>
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
                  onChange={(e) => setName(e.target.value)}
                  value={name}
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
                  value={description}
                  maxLength={500}
                  onChange={(e) => setDescription(e.target.value)}
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
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                  placeholder="Choisir un ou plusieurs collaborateurs"
                  className={styles.projectModalSelectInput}
                />
                {visibleSuggestions.length > 0 && (
                  <ul className={styles.suggestionList}>
                    {visibleSuggestions.map((user) => {
                      const isSelected = contributors.includes(user.email);
                      return (
                        <li key={user.id}>
                          <label
                            className={`${styles.suggestionRow} ${isSelected ? styles.selected : ""}`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleContributor(user.email)}
                              className={styles.visuallyHidden}
                            />
                            <span
                              className={styles.suggestionInitials}
                              aria-hidden="true"
                            >
                              {getInitials(user.name)}
                            </span>
                            <span className={styles.suggestionText}>
                              {user.name ?? user.email}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                )}
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
