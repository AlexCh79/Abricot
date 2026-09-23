import type { Metadata } from "next";
import LogoutForm from "@/components/forms/LogoutForm/LogoutForm";

export const metadata: Metadata = {
  title: "Mon compte",
  description: "Visualisation du compte utilisateur",
};
export default function Profile() {
  return <LogoutForm />;
}
