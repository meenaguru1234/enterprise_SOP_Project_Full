# Enterprise SOP Project

## Project Overview

This repository contains the Enterprise SOP (Standard Operating Procedures) application. It is split into two main parts:

- `Backend/` — Node.js API server (controllers, middleware, authentication).
- `frontend/` — React single-page application built with Vite (UI, authentication client, and user workflows).

The frontend communicates with the backend API to perform CRUD operations, authentication, and data validation for SOPs.

## Quick Start

Prerequisites:

- Node.js 16+ and npm (or yarn/pnpm).

Basic steps to run both services locally:

```bash
# start backend
cd Backend
npm install
npm run dev   # or `npm start` depending on package.json

# in a separate terminal, start frontend
cd ../frontend
npm install
npm run dev
```

Open the frontend dev server URL shown by Vite (typically `http://localhost:5173`). Ensure the backend is running and `VITE_API_BASE_URL` is set correctly.

## Repository Structure

- `Backend/` — API server source. Check `Backend/package.json` for start/dev scripts.
  - `Controller/` — route controllers and middleware (example: `Controller/middleware/Loginschema.js`).
- `frontend/` — React + Vite application.
  - `src/` — React source files (`App.jsx`, `main.jsx`, components, CSS, `Authaxios` helper).
  - `public/` — static assets.
  - `README.md` — frontend-specific instructions (see [frontend/README.md](frontend/README.md)).

## Environment Variables

Create environment files for each service. Example variables:

- Frontend (`frontend/.env` or `.env.local`):

```env
VITE_API_BASE_URL=http://localhost:5000
```

- Backend (`Backend/.env`):

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
DB_URL=your_database_url_here
```

Adjust values per your development or production environment. Do not commit secrets to source control.

## Running & Building

- Frontend (in `frontend/`):

```bash
npm install
npm run dev      # development
npm run build    # production build
npm run preview  # preview production build
```

- Backend (in `Backend/`):

```bash
npm install
npm run dev   # development (if provided)
npm start     # production/start script
```

## Authentication

Authentication is handled by the backend API. The frontend includes `src/Authaxios/Auth.jsx` to centralize authenticated requests and token handling. Confirm the backend uses JWTs or cookies and coordinate storage strategy (httpOnly cookies are recommended for security when possible).

## Development Notes

- Use the browser devtools to troubleshoot API requests and CORS—ensure the backend enables CORS for local development.
- Keep components small and focused; reuse styles in `frontend/src/CSS/`.
- Add unit and integration tests as future work (suggested: Jest + React Testing Library for frontend; Jest or Mocha for backend).

## Linting & Formatting

- Frontend includes `eslint.config.js`. Consider adding Prettier and pre-commit hooks (husky) to enforce code style.

## Deployment

Frontend builds into a static `dist/` folder which can be served by any static hosting provider or by the backend server. Set `VITE_API_BASE_URL` to the production API URL when building for production.

Backend deployment depends on your chosen hosting (Heroku, AWS, DigitalOcean, etc.) — ensure environment variables and DB connections are configured.

## Contributing

- Fork the repository and open a pull request for review.
- Keep changes small and provide clear descriptions.

## TODOs

- Add comprehensive tests (frontend + backend).
- Add CI/CD (GitHub Actions) for lint, test, and deploy.
- Harden authentication (refresh tokens, secure cookie usage).

---

For frontend-specific information see [frontend/README.md](frontend/README.md).

