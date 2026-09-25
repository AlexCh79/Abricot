"use client";

import { useUser } from "@/context/UserContext";
type GreetingProps = {
  className?: string;
};

export default function Greeting({ className }: GreetingProps) {
  const { user } = useUser();
  return (
    <p className={className}>
      {user?.name ? `Bonjour ${user.name}, ` : "Bonjour, "} voici un aperçu de
      vos projets et tâches
    </p>
  );
}
