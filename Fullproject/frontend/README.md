# Enterprise SOP — Frontend (React + Vite)

## Project Overview

This repository contains the frontend for the Enterprise SOP project — a single-page application built with React and Vite. The frontend implements the user interface, authentication flows, and communicates with the backend API located in the `Backend` folder.

Key responsibilities of the frontend:
- Render SOP dashboards and forms.
- Handle user authentication and session management.
- Validate input client-side and coordinate with the backend for CRUD operations.
- Provide a responsive, accessible UI.

## Features
- User login and protected routes.
- Parent/child component structure for main views (`Parentcomponent.jsx`, `Home.jsx`).
- Centralized API access via `Authaxios/Auth.jsx` for authenticated requests.
- Styling with scoped CSS under `CSS/` (e.g., `home.css`, `Login.css`).

## Tech Stack
- React (JSX)
- Vite (dev server & build)
- Vanilla CSS (project CSS files under `src/CSS/`)
- ESLint (project linting configured in `eslint.config.js`)

## Repository Structure (frontend)

- `index.html` — App entry HTML.
- `src/main.jsx` — React application bootstrap.
- `src/App.jsx`, `src/App.css` — Root component and styles.
- `src/Components/Parentcomponent.jsx`, `src/Components/Home.jsx` — Main UI components.
- `src/Authaxios/Auth.jsx` — Axios wrapper for authenticated API calls.
- `src/CSS/` — Component-specific CSS files (`home.css`, `Login.css`).
- `public/` — Static assets served by Vite.

## Important files
- `src/main.jsx` — Application mounting.
- `src/App.jsx` — Routes and top-level layout.
- `src/Authaxios/Auth.jsx` — Authentication and API utility.
- `src/Components/Home.jsx` — Example protected page.
- `eslint.config.js` — Lint configuration.

## Prerequisites
- Node.js 16+ and npm (or pnpm/yarn).
- The backend server (in `Backend/`) should be running to enable full frontend functionality.

## Environment variables

Create a `.env` or `.env.local` in the `frontend` folder (Vite uses `VITE_` prefixes). Typical variables:

- `VITE_API_BASE_URL` — Base URL of the backend API (e.g., `http://localhost:5000`).

Example `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Note: Vite exposes only variables prefixed with `VITE_` to client code.

## Install and run (frontend)

Install dependencies and start the dev server from the `frontend` folder:

```bash
cd frontend
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Backend (local dev)

The frontend talks to the backend code in the `Backend` folder. To run the backend locally:

```bash
cd Backend
npm install
# then either
npm run dev   # if a dev script (nodemon/pm2) exists
# or
npm start     # start script defined in package.json
```

Check `Backend/package.json` for exact scripts.

## Authentication

Authentication flows are managed in `src/Authaxios/Auth.jsx`. The frontend stores tokens in memory or local storage depending on the implementation; ensure the backend returns tokens according to the agreed API (e.g., JWT in response body or cookies).

## API integration notes

- Configure `VITE_API_BASE_URL` to point at the backend.
- Use `Authaxios/Auth.jsx` to attach auth headers to requests.
- Backend controllers and schemas live in the `Backend/Controller` folder (for example, `Controller/middleware/Loginschema.js`).

## Development tips
- Keep components small and focused; lift shared state up to parent components when needed.
- Reuse styles in `src/CSS/` and scope files to components.
- Use the browser devtools to inspect requests and CORS issues — ensure backend includes CORS headers for local development.

## Linting and formatting
- Run the lint config defined in `eslint.config.js`.
- Add `prettier` or other formatters if desired and configure editor integrations.

## Testing
- This project currently does not include automated tests. Consider adding unit tests with `Jest` and component tests with `React Testing Library`.

## Deployment

Build the app (`npm run build`) and serve the static output from a static host (Netlify, Vercel, S3 + CloudFront) or via your backend by serving the `dist` folder.

Ensure the `VITE_API_BASE_URL` is set appropriately for the production backend.

## Contributing
- Fork the repo, create a feature branch, and open a pull request.
- Keep changes small and add documentation for new features.

## Further work / TODOs
- Add unit and integration tests.
- Harden auth flows (refresh tokens, secure storage).
- Add TypeScript for stronger typing.

## Contact
If you want help integrating features or adding CI/CD, open an issue or contact the maintainer.

---

This README focuses on the frontend in `frontend/`. If you'd like, I can also:
- Expand installation instructions for the `Backend` folder.
- Add example `.env` files per environment.
- Create a top-level README that documents the full project.
