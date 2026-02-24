# Postpartum Growth MVP (Next.js + Tailwind + Prisma + SQLite)

A simple MVP for postpartum planning with:
- Dashboard
- Settings (cycle length + start date)
- Modules (6)
- Review

## Tech stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite

## Local run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client and run first migration:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000`

## Notes
- Settings are stored in SQLite (`prisma/dev.db`) using a single `UserSettings` record (`id = 1`).
- Dashboard reads settings and shows module overview.
