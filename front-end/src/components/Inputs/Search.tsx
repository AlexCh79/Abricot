"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./Search.module.scss";

type SearchProps = {
  onSearch?: (value: string) => void;
};

export const Search = ({ onSearch }: SearchProps) => {
  const [item, setItem] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch?.(item);
  };
  return (
    <form role="search" onSubmit={handleSubmit} className={styles.inputWrapper}>
      <input
        type="search"
        id="search"
        name="search"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Rechercher une tâche"
        aria-label="Rechercher une tâche"
        className={styles.searchInput}
      />
      <button
        type="submit"
        aria-label="Rechercher"
        className={styles.searchBtn}
      >
        <Image
          src="/icon_loup.svg"
          width={14}
          height={14}
          alt=""
          className={styles.searchIcon}
        />
      </button>
    </form>
  );
};
