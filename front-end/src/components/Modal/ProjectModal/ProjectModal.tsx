"use client";

import styles from "./ProjectModal.module.scss";
import Image from "next/image";
import { Button } from "../../buttons/Button/Button";
import { Modal } from "../Modal";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import {
  addContributor,
  createProject,
  deleteProject,
  getProject,
  removeContributor,
  updateProject,
} from "@/services/projectService";
import { ProjectWithTasks } from "@/types/ProjectsWithTasks";
import { User } from "@/types/User";
import { searchUsers } from "@/services/userService";
import { getInitials } from "@/utils/name";

type ProjectModalProps = {
  project?: ProjectWithTasks;
  onClose: () => void;
  onCreated?: (project: ProjectWithTasks) => void;
  onUpdated?: (project: ProjectWithTasks) => void;
  onDeleted?: () => void;
};

export function ProjectModal({
  project,
  onClose,
  onCreated,
  onUpdated,
  onDeleted,
}: ProjectModalProps) {
  const [name, setName] = useState(project?.name ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  // States pour la recherche d'email utilisateurs
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<User[]>([]);
  // Gestion des contributeurs multiples
  const [contributors, setContributors] = useState<string[]>(
    project?.members.map((member) => member.user.email) ?? [],
  );
  const isEdit = Boolean(project);
  // Gestion de la demande de suppression d'un projet
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useUser();
  const isOwner = Boolean(user && project && user.id === project.ownerId);

  // Suppression d'un projet
  const handleDelete = async () => {
    if (!project) return;
    setError("");
    setIsDeleting(true);

    try {
      await deleteProject(project.id);
      onDeleted?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Suppression impossible");
      setIsConfirmDelete(false);
    } finally {
      setIsDeleting(false);
    }
  };

  // Sélection et déselection des contributeurs
  const toggleContributor = (email: string) => {
    setContributors((current) =>
      current.includes(email)
        ? current.filter((item) => item !== email)
        : [...current, email],
    );
  };

  // Définition du titre de la modale
  const submitLabel = isSaving
    ? "Enregistrement..."
    : isEdit
      ? "Enregistrer les modifications"
      : "Ajouter un projet";

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

  // Liste avant / après des contributeurs pour gérer la modif à l'envoi du formulaire
  const initialEmails =
    project?.members.map((member) => member.user.email) ?? [];
  // Récupération de l'ID lié à l'email du contributeur
  const userIdByEmail = new Map(
    project?.members.map((member) => [member.user.email, member.user.id]) ?? [],
  );

  // Création du projet
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      // Création ou modification du projet
      if (project) {
        await updateProject(project.id, { name, description });
        const added = contributors.filter(
          (email) => !initialEmails.includes(email),
        );
        const removed = initialEmails.filter(
          (email) => !contributors.includes(email),
        );

        await Promise.all([
          ...added.map((email) => addContributor(project.id, { email })),
          ...removed.map((email) => {
            const userId = userIdByEmail.get(email);
            return userId
              ? removeContributor(project.id, userId)
              : Promise.resolve();
          }),
        ]);
        const refreshed = await getProject(project.id);
        onUpdated?.({ ...refreshed, tasks: project.tasks });
      } else {
        const created = await createProject({
          name,
          description,
          contributors,
        });
        onCreated?.({ ...created, tasks: [] });
      }
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Enregistrement impossible.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal onClose={onClose} labelledBy="project-modal-title">
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
              {isEdit ? "Modifier le projet" : "Créer un projet"}
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
                  placeholder={
                    isEdit
                      ? "Ajouter un collaborateur"
                      : "Choisir un ou plusieurs collaborateurs"
                  }
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

                {contributors.length > 0 ? (
                  <ul className={styles.contributorsList}>
                    {contributors.map((email) => (
                      <li key={email}>
                        <button
                          type="button"
                          className={styles.contributorsChip}
                          onClick={() => toggleContributor(email)}
                          aria-label={`Retirer ${email}`}
                        >
                          <span>{email}</span>
                          <span aria-hidden="true">×</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  isEdit && (
                    <p className={styles.emptyText}>
                      Aucun contributeur sur ce projet
                    </p>
                  )
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
          {isConfirmDelete ? (
            <div className={styles.confirmZone}>
              <p role="alert" className={styles.confirmText}>
                Supprimer définitivement &quot;{project?.name}&quot; et toutes
                ses tâches ?
              </p>
              <Button
                type="button"
                label="Annuler"
                autoFocus
                onClick={() => setIsConfirmDelete(false)}
              />
              <Button
                type="button"
                label={isDeleting ? "Suppression..." : "Oui, supprimer"}
                disabled={isDeleting}
                onClick={handleDelete}
              />
            </div>
          ) : (
            <>
              <Button label={submitLabel} type="submit" disabled={isSaving} />
              {isEdit && isOwner && (
                <Button
                  label="Supprimer un projet"
                  type="button"
                  onClick={() => setIsConfirmDelete(true)}
                />
              )}
            </>
          )}
        </div>
      </form>
    </Modal>
  );
}
