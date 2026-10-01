"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Modal.module.scss";

type ModalProps = {
  onClose: () => void;
  labelledBy: string;
  withCloseButton?: boolean;
  children: React.ReactNode;
};

export function Modal({
  onClose,
  labelledBy,
  withCloseButton,
  children,
}: ModalProps) {
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
      {withCloseButton && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Fermer"
        >
          <Image
            src="/icon_cross.svg"
            width={15}
            height={15}
            alt=""
            aria-hidden="true"
          />
        </button>
      )}
      {children}
    </dialog>
  );
}
