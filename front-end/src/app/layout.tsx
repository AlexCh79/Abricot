import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "@/styles/globals.scss";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Abricot",
    default: "Abricot",
  },
  description: "Gérer vos projets facilement avec Abricot !",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
