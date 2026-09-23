// Stockage cookie
export function setCookie(name: string, value: string, days: number) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000,
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`;
}

// Récupération du cookie
export function getCookie(name: string) {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  if (!match) return null;

  return decodeURIComponent(match.split("=")[1]);
}

// Expiration du cookie
export function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
}
