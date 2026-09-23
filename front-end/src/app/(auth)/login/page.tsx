import type { Metadata } from "next";
import LoginForm from "@/components/forms/LoginForm/LoginForm";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connexion utilisateur",
};

export default function Login() {
  return (
    <>
      <LoginForm />
    </>
  );
}
