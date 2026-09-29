"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./Search.module.scss";

type SearchProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
};

export const Search = ({
  placeholder = "Rechercher",
  onSearch,
}: SearchProps) => {
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
        placeholder={placeholder}
        aria-label={placeholder}
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
