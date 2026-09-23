import Header from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
