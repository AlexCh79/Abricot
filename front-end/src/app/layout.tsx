import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./assets/styles/globals.scss";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abricot",
  description: "Gérer vos projets facilement avec Abricot !",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
