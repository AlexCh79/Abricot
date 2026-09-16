import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-display text-brand-text text-h1">404</p>
      <h1 className="font-display text-h4 text-grey-950">Page introuvable</h1>
      <p className="text-body-m text-grey-600 max-w-md">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="bg-grey-950 text-body-m hover:bg-grey-800 mt-2 rounded-lg px-6 py-3 text-white"
      >
        Retour au tableau de bord
      </Link>
    </main>
  );
}