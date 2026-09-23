import { NextResponse, type NextRequest } from "next/server";

// Définition des pages publiques
const publicRoutes = ["/login", "/register"];

// Gestion des pages en fonction de la connexion utilisateur
export default function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // Récupère le token dans le cookie stocké s'il existe
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname); // Récupère les routes des pages publiques

  // Si utilisateur non connecté et page n'est pas publique, renvoie vers la page de connexion
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si utilisateur est connecté et page publique, on renvoie vers le dashboard
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Autres cas normaux
  return NextResponse.next();
}

// Détermination des chemins où le proxy doit s'exécuter.
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};
