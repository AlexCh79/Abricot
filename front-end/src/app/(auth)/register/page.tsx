import RegisterForm from "@/components/forms/RegisterForm/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function Register() {
  return <RegisterForm />;
}
