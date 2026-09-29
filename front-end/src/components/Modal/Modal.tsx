"use client";

import { useEffect, useRef } from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
  onClose: () => void;
  labelledBy: string;
  children: React.ReactNode;
};

export function Modal({ onClose, labelledBy, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      {children}
    </dialog>
  );
}
