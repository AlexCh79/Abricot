"use client";
import { Button } from "@/components/buttons/Button/Button";
import { logout } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
    router.refresh();
  };

  return (
    <div>
      <Button label="Se déconnecter" type="button" onClick={handleLogout} />
    </div>
  );
}
