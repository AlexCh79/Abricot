"use client";
import styles from "./ProjectModal.module.scss";
import Image from "next/image";
import { Button } from "../buttons/Button/Button";
import { Modal } from "./Modal";

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="project-modal-title">
      <form className={styles.projectModalPage}>
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
                <label htmlFor="title" className={styles.projectModalLabel}>
                  Titre*
                </label>
                <input
                  id="title"
                  name="title"
                  required
                  className={styles.projectModalTextInput}
                />
              </div>
              <div className={styles.projectModalGroup}>
                <label
                  htmlFor="description"
                  className={styles.projectModalLabel}
                >
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
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
                <select
                  id="contributors"
                  defaultValue=""
                  name="contributors"
                  className={styles.projectModalSelectInput}
                >
                  <option value="" disabled>
                    Choisir un ou plusieurs collaborateurs
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.btnZone}>
          <Button label="Ajouter un projet" type="submit" />
          {/* <Button label="Supprimer un projet" type="button" /> */}
        </div>
      </form>
    </Modal>
  );
}
