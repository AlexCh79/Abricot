"use client";

import { useState, useEffect } from "react";
import { getProfile } from "@/services/authService";

type GreetingProps = {
  className?: string;
};

export default function Greeting({ className }: GreetingProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    const loadName = async () => {
      try {
        const user = await getProfile();
        setName(user.name);
      } catch {}
    };
    loadName();
  }, []);

  return (
    <p className={className}>
      {name ? `Bonjour ${name}, ` : "Bonjour, "} voici un aperçu de vos projets
      et tâches
    </p>
  );
}
