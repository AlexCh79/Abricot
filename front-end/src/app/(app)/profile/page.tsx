import type { Metadata } from "next";
import ProfileForm from "@/components/forms/ProfileForm/ProfileForm";

export const metadata: Metadata = {
  title: "Mon compte",
  description: "Visualisation du compte utilisateur",
};
export default function Profile() {
  return <ProfileForm />;
}
