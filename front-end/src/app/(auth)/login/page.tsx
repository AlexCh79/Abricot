import type { Metadata } from "next";
import LoginForm from "@/components/forms/LoginForm/LoginForm";

export const metadata: Metadata = {
  title: "Log In",
};

export default function Login() {
  return (
    <>
      <LoginForm />
    </>
  );
}
