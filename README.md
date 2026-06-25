# Personal Portfolio

A full-stack personal portfolio by **Leonardo Teixeira** — a React + TypeScript single-page app backed by a Node/Express API and PostgreSQL. It showcases work experience, projects, and skills, and includes a working contact form that delivers email via [Resend](https://resend.com).

> 🌐 **Live:** _leoteixeira.me_ &nbsp;·&nbsp; the production frontend talks to an API hosted on Railway.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Run with Docker (recommended)](#run-with-docker-recommended)
  - [Run locally without Docker](#run-locally-without-docker)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Editing Content](#editing-content)
- [Testing](#testing)
- [Deployment](#deployment)

---

## Tech Stack

| Layer        | Technologies                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, Radix UI / shadcn, MUI, React Icons  |
| **Backend**  | Node.js, Express, TypeScript, `pg` (PostgreSQL driver), Resend, Multer      |
| **Database** | PostgreSQL 15                                                                |
| **Tooling**  | Docker & Docker Compose, Vitest + Supertest, ESLint                         |

## Project Structure

```
portfolio/
├── docker-compose.yml        # Orchestrates database, backend, and frontend
├── frontend/                 # React + Vite SPA
│   └── src/
│       ├── pages/            # Portfolio page and its sections
│       │   └── components/   # Home, About, Experiences, Projects, Skills, Contact…
│       ├── components/ui/    # Reusable shadcn/Radix UI primitives
│       └── config/config.ts  # API base URL (local vs. production)
└── backend/                  # Express + TypeScript REST API
    ├── database/schema.sql   # Schema + seed data (projects, experiences)
    └── src/
        ├── routes/           # projects, experiences, contact
        ├── controllers/      # Request handlers
        ├── services/         # Database access layer
        └── config/db.ts      # PostgreSQL connection pool
```

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) & Docker Compose **— or —** Node.js 20+ and a local PostgreSQL instance.

### Run with Docker (recommended)

This is the simplest path: it spins up PostgreSQL (with the schema and seed data auto-loaded), the backend, and the frontend together.

```bash
docker compose up --build
```

| Service   | URL                            |
| --------- | ------------------------------ |
| Frontend  | http://localhost:5173          |
| Backend   | http://localhost:5000/api      |
| Database  | postgres://localhost:5432      |

On first run, `backend/database/schema.sql` is executed automatically to create the tables and seed sample projects and experiences.

### Run locally without Docker

1. **Database** — start PostgreSQL and create a `portfolio` database, then load the schema:
   ```bash
   psql -d portfolio -f backend/database/schema.sql
   ```

2. **Backend**
   ```bash
   cd backend
   cp .env.example .env      # then fill in the values
   npm install
   npm run dev               # starts the API on http://localhost:5000
   ```

3. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev               # starts Vite on http://localhost:5173
   ```

The frontend automatically targets `http://localhost:5000` when served from `localhost:5173`, and the production API otherwise (see `frontend/src/config/config.ts`).

## Environment Variables

Configure the backend via `backend/.env` (see `backend/.env.example`):

| Variable         | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `PORT`           | Backend port (default `5000`)                          |
| `NODE_ENV`       | `development` or `production`                          |
| `DATABASE_URL`   | PostgreSQL connection string                           |
| `API_KEY`        | Key required for write endpoints (`POST`/`PUT`/`DELETE`) |
| `FRONTEND_URL`   | Allowed origin for CORS                                |
| `RESEND_API_KEY` | Resend API key for the contact form                   |
| `EMAIL_TO`       | Address that receives contact-form messages           |
| `EMAIL_FROM`     | Verified sender address                                |

## API Reference

Base path: `/api`. Read endpoints are public; write endpoints (marked 🔒) require an `x-api-key` header matching `API_KEY`.

| Method | Endpoint              | Auth | Description                  |
| ------ | --------------------- | :--: | --------------------------- |
| GET    | `/api/health`         |      | Health check                |
| GET    | `/api/projects`       |      | List all projects           |
| GET    | `/api/projects/:id`   |      | Get a project by id         |
| POST   | `/api/projects`       |  🔒  | Create a project            |
| PUT    | `/api/projects/:id`   |  🔒  | Update a project            |
| DELETE | `/api/projects/:id`   |  🔒  | Delete a project            |
| GET    | `/api/experiences`    |      | List all experiences        |
| GET    | `/api/experiences/:id`|      | Get an experience by id     |
| POST   | `/api/experiences`    |  🔒  | Create an experience        |
| PUT    | `/api/experiences/:id`|  🔒  | Update an experience        |
| DELETE | `/api/experiences/:id`|  🔒  | Delete an experience        |
| POST   | `/api/contact`        |      | Submit a contact message    |
| GET    | `/api/contact`        |      | List contact messages       |
| DELETE | `/api/contact/:id`    |      | Delete a contact message    |

## Editing Content

- **Experiences** live in two places that should stay in sync: the seed data in `backend/database/schema.sql` and the mock fallback in `frontend/src/pages/components/ExperiencesSection.tsx` (used when the API is unreachable). The component renders the API response when available.
- **Skills & technologies** are defined directly in `frontend/src/pages/components/SkillsSection.tsx`, grouped into **Languages / Frontend / Backend / Tools & Cloud**, using [`react-icons`](https://react-icons.github.io/react-icons/).
- **Projects** are seeded in `backend/database/schema.sql` and served via the API.

## Testing

The backend uses Vitest with Supertest for route tests:

```bash
cd backend
npm test
```

CI runs these on pull requests via `.github/workflows/pr-tests.yml`.

## Deployment

- **Frontend** — build with `npm run build` (outputs static assets) and deploy to any static host (e.g. Vercel).
- **Backend** — build with `npm run build` and run `npm start`; the production API is hosted on Railway.
- **Database** — PostgreSQL; apply `backend/database/schema.sql` to initialize.

---

_Built and maintained by Leonardo Teixeira._
