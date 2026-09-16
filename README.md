# Spendwise

A responsive expense tracker for logging daily expenses, organising them into categories, setting monthly budgets, and viewing spending on a dashboard.

## Stack

- **Frontend:** React + TypeScript + Vite, Tailwind CSS, shadcn/ui, TanStack Query, React Router, Recharts
- **Backend:** Go + Gin, PostgreSQL, pgx v5, sqlc, golang-migrate
- **Hosting:** Vercel (frontend), Render/Koyeb (backend), Neon (database)

## Running locally

```bash
# Start local database
docker compose up -d

# Backend (from /backend)
make run

# Frontend (from /frontend)
npm run dev
```
