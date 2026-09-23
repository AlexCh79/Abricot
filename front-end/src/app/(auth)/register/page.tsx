import RegisterForm from "@/components/forms/RegisterForm/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription",
  description: "Inscription utilisateur",
};

export default function Register() {
  return <RegisterForm />;
}
