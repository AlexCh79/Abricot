import Header from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { UserProvider } from "@/context/UserContext";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <UserProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </UserProvider>
  );
}
