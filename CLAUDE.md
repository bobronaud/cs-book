# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CS Book is a CS2 reference app — a single-page React frontend for browsing grenade lineups and crosshairs. The UI is in Russian. There is no backend yet; data is hardcoded.

## Commands

All commands run from `frontend/`:

```bash
npm run dev      # start dev server (Vite)
npm run build    # tsc + vite build
npm run preview  # preview production build
```

No test runner is configured.

## Architecture

- **`src/data/crosshairs.ts`** — static crosshair definitions (`Crosshair[]`). This is the only data source; grenade data does not exist yet.
- **`src/App.tsx`** — root layout with `react-router-dom` routes: `/` → redirect to `/grenades`, `/grenades`, `/crosshairs`, `/admin`.
- **`src/pages/`** — one directory per route. Pages own local state and compose shared components.
- **`src/components/`** — shared components. Each component lives in its own folder with a co-located `.module.scss`.
- **`src/styles/_variables.scss`** — global SCSS design tokens (colors, spacing, `$header-height`). Import this whenever adding styled components.

## Key conventions

- Path alias `@/` resolves to `src/` (configured in `vite.config.ts` and `tsconfig.json`).
- CSS Modules (`.module.scss`) for all component styles. Global styles only in `src/styles/global.scss`.
- `CrosshairSVG` renders crosshairs procedurally from `CrosshairParams` — no image assets needed for crosshairs.
- Admin page (`/admin`) is PIN-protected via `VITE_ADMIN_PIN` env var and `sessionStorage`. The admin forms are UI-only stubs; no submission logic exists yet.
- The app shows a mobile guard overlay for non-desktop viewports (hardcoded in `App.tsx`).
