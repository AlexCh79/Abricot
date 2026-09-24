# Abricot — Front-end

Interface web de **Abricot**, un SaaS de gestion de projets et de tâches en équipe.

Projet réalisé dans le cadre de la formation Développeur Full-Stack (OpenClassrooms).
L'API REST est fournie et se trouve dans le dossier [`../back-end`](../back-end/README.md).

<!-- TODO : ajouter une capture d'écran de l'application et, le cas échéant, l'URL de démonstration -->

## Sommaire

- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage](#démarrage)
- [Comptes de test](#comptes-de-test)
- [Scripts disponibles](#scripts-disponibles)
- [Structure du projet](#structure-du-projet)
- [Conventions de code](#conventions-de-code)
- [Accessibilité](#accessibilité)
- [Écarts constatés avec la documentation de l'API](#écarts-constatés-avec-la-documentation-de-lapi)

## Stack technique

Chaque dépendance du `package.json` est justifiée ci-dessous.

### Dépendances de production

| Paquet                | Version | Rôle                                                                                                                              |
| --------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `next`                | 16.3.5  | Framework React : routage par fichiers (App Router), composants serveur, métadonnées SEO et protection des routes via `proxy.ts`. |
| `react` / `react-dom` | 19.2.8  | Bibliothèque d'interface, socle de Next.js.                                                                                       |
| `sass`                | ^1.104  | Préprocesseur CSS utilisé avec les CSS Modules : variables du design system, imbrication et mixins, sans nom de classe global.    |

Aucune bibliothèque de composants ni de gestion d'état n'a été ajoutée : les besoins du
projet (formulaires contrôlés, appels API, état local) sont couverts par React seul. Les
appels réseau utilisent l'API `fetch` native, sans client HTTP supplémentaire.

### Dépendances de développement

| Paquet                                                          | Rôle                                                                                              |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `typescript`, `@types/node`, `@types/react`, `@types/react-dom` | Typage statique : les réponses de l'API sont décrites dans `src/types/`.                          |
| `eslint`, `eslint-config-next`                                  | Analyse statique, incluant les règles d'accessibilité `jsx-a11y` et les bonnes pratiques Next.js. |
| `prettier`                                                      | Formatage automatique et homogène du code.                                                        |

## Prérequis

- **Node.js 20 ou supérieur** (développé avec Node 24.19)
- **npm** (le projet utilise `package-lock.json`)
- L'API du dossier `back-end` installée et démarrée — voir son [README](../back-end/README.md)

## Installation

```bash
npm install
```

Créer ensuite un fichier `.env.local` à la racine de `front-end/` :

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Le préfixe `NEXT_PUBLIC_` est nécessaire pour que la variable soit lisible depuis le
navigateur. Ce fichier n'est pas versionné.

## Démarrage

1. Démarrer l'API (dans `back-end/`) :

```bash
npm run dev
```

L'API écoute sur le port **8000**, sa documentation Swagger est disponible sur
<http://localhost:8000/api-docs>.

2. Démarrer le front (dans `front-end/`) :

```bash
npm run dev
```

L'application est disponible sur <http://localhost:8001>.

> **Le port 8001 n'est pas arbitraire** : la configuration CORS de l'API n'autorise que
> les origines `localhost:8000` et `localhost:8001`. Démarrer le front sur un autre port
> fait échouer tous les appels réseau.

## Comptes de test

La base de démonstration est alimentée par `npm run seed` (dans `back-end/`). Elle
contient 10 comptes partageant le même mot de passe :

| Email               | Mot de passe  |
| ------------------- | ------------- |
| `alice@example.com` | `P@ssword123` |
| `bob@example.com`   | `P@ssword123` |
| …                   | …             |

## Scripts disponibles

| Commande           | Description                                           |
| ------------------ | ----------------------------------------------------- |
| `npm run dev`      | Démarre le serveur de développement sur le port 8001. |
| `npm run build`    | Compile l'application pour la production.             |
| `npm run start`    | Démarre l'application compilée sur le port 8001.      |
| `npm run lint`     | Analyse le code avec ESLint.                          |
| `npm run format`   | Formate l'ensemble du code avec Prettier.             |
| `npx tsc --noEmit` | Vérifie les types sans générer de fichiers.           |

## Structure du projet

```
src/
├── app/                      # Routage (App Router)
│   ├── (app)/                # Pages authentifiées : en-tête et pied de page communs
│   │   ├── dashboard/
│   │   ├── projects/
│   │   └── profile/
│   ├── (auth)/               # Pages publiques : connexion et inscription
│   │   ├── login/
│   │   └── register/
│   └── layout.tsx            # Layout racine : polices, métadonnées globales
├── components/               # Composants réutilisables (un dossier par composant)
│   ├── buttons/
│   ├── forms/
│   ├── icons/                # Icônes SVG converties en composants React
│   └── tags/
├── services/                 # Appels à l'API, regroupés par domaine
│   ├── api.ts                # Fetch commun : URL, en-têtes, token, gestion des erreurs
│   ├── authService.ts
│   └── dashService.ts
├── types/                    # Types TypeScript décrivant les réponses de l'API
├── utils/                    # Fonctions utilitaires (cookies, nom/prénom)
├── styles/                   # Variables, mixins et styles globaux
└── proxy.ts                  # Protection des routes (ex-middleware de Next.js)
```

Les parenthèses dans `app/` délimitent des **groupes de routes** : elles permettent de
partager un layout sans apparaître dans l'URL. `(app)/dashboard` répond donc à `/dashboard`.

### Authentification

Le token JWT renvoyé par l'API est stocké dans un cookie (`path=/`, `SameSite=Strict`) et
ajouté automatiquement en en-tête `Authorization` par `services/api.ts`.

`src/proxy.ts` vérifie la **présence** de ce cookie avant d'afficher une page protégée et
redirige vers `/login` le cas échéant. Il s'agit d'un confort de navigation, pas d'une
mesure de sécurité : la validité réelle du token est vérifiée par l'API, seule détentrice
de la clé de signature.

<!-- TODO : à compléter au fil de l'avancement — projets, tâches, génération par IA -->

## Conventions de code

- **Code en anglais, interface en français** : noms de fichiers, de composants, de
  variables et d'URL en anglais (`/login`, `ProfileForm`, `firstName`) ; tous les textes
  affichés à l'utilisateur en français.
- **Un dossier par composant**, contenant le `.tsx` et son `.module.scss`.
- **CSS Modules** : aucun nom de classe global, pas de convention BEM nécessaire. Les
  couleurs et tailles proviennent de `src/styles/_variables.scss`.
- **Composants serveur par défaut** : la directive `"use client"` n'est ajoutée qu'aux
  composants ayant besoin d'interactivité ou de hooks. Les pages restent des composants
  serveur afin de pouvoir exporter leurs métadonnées.

## Accessibilité

L'objectif est la conformité **WCAG 2.1 niveau AA**. Principaux points traités :

- **Contrastes** : la couleur de marque `#D3590B` de la maquette n'atteint que 4,03:1 sur
  blanc, insuffisant pour du texte de taille normale. Une variante assombrie
  (`$color-brand-orange-text`) est utilisée pour le texte, la couleur d'origine étant
  conservée pour les icônes et les grands éléments, qui n'exigent que 3:1.
- **Navigation** : le lien de la page courante porte `aria-current="page"`, qui sert à la
  fois au style et à l'annonce par les lecteurs d'écran. Les états de focus sont visibles
  au clavier (`:focus-visible`).
- **Formulaires** : chaque champ possède un `<label>` associé, les consignes de saisie sont
  reliées par `aria-describedby`, les messages d'erreur portent `role="alert"` et les
  confirmations `role="status"`.
- **Images et icônes** : les icônes décoratives sont masquées aux lecteurs d'écran
  (`aria-hidden="true"` ou `alt=""`) ; aucun bouton n'est laissé sans nom accessible.
- **Structure** : un seul `<h1>` par page et des niveaux de titres non sautés.

Vérifications effectuées avec l'extension **WAVE**, les avertissements ESLint `jsx-a11y`
et une navigation complète au clavier.

<!-- TODO : ajouter les scores Lighthouse une fois l'application terminée -->

## Écarts constatés avec la documentation de l'API

Ces écarts ont été identifiés en comparant la documentation Swagger au code source du
backend, puis vérifiés par des appels réels à l'API.

| Constat                           | Détail                                                                                                                                                            | Traitement côté front                                                                                          |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Routes non documentées            | `PUT /auth/profile` et `PUT /auth/password` existent et fonctionnent, mais n'apparaissent pas dans Swagger (annotations absentes).                                | Contrat lu dans `src/routes/authRoutes.ts` et vérifié par appel direct.                                        |
| Format des erreurs de validation  | Swagger annonce un tableau `details` à la racine ; l'API renvoie en réalité `data.errors`.                                                                        | Le type `ApiError` décrit la réponse réelle.                                                                   |
| Message de mot de passe incomplet | `PUT /auth/password` n'indique pas le caractère spécial dans son message d'erreur, alors que sa validation l'exige.                                               | La consigne affichée à l'utilisateur mentionne `(@$!%*?&)`.                                                    |
| Tri des priorités                 | `/dashboard/assigned-tasks` trie par `priority` croissant ; le champ étant une chaîne, le tri est alphabétique (`HIGH, LOW, MEDIUM, URGENT`) et non hiérarchique. | Les tâches sont retriées côté client selon l'ordre métier.                                                     |
| Nom unique                        | La maquette prévoit des champs « Nom » et « Prénom » distincts ; l'API ne stocke qu'un champ `name`.                                                              | Conversion dans `src/utils/name.ts` (format `"Prénom Nom"`), au prix d'une ambiguïté sur les prénoms composés. |
| Mot de passe oublié               | Le lien figure sur la maquette de connexion, mais aucune route de l'API ne le gère.                                                                               | <!-- TODO : décider du comportement retenu -->                                                                 |

## Maquettes

<!-- TODO : lien vers le fichier Figma -->

Les maquettes fournies ne couvrent ni la page 404 ni les versions mobiles : ces écrans ont
été conçus à partir des composants existants, en responsive.

## Auteur

Alexandra Chanteloup - septembre 2026
Lien gitHub : https://github.com/AlexCh79/Abricot.git
