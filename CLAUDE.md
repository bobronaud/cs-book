# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CS Book is a CS2 reference app — a single-page React frontend for browsing grenade lineups and crosshairs. The UI is in Russian. There is no backend; all data is bundled at build time from files under `src/data/`.

## Commands

All commands run from the repo root:

```bash
npm run dev      # start dev server (Vite)
npm run build    # tsc + vite build
npm run preview  # preview production build
```

No test runner is configured.

## Architecture

- **`src/App.tsx`** — root layout (`Header` / `main` / `Footer`) with `react-router-dom` routes: `/` → redirect to `/grenades`, `/grenades`, `/crosshairs`, and `*` → `NotFoundPage`.
- **`src/main.tsx`** — mounts `App` inside `BrowserRouter` with `basename={import.meta.env.BASE_URL}` (needed for the GitHub Pages subpath).
- **`src/pages/`** — one directory per route. Pages own local state (e.g. filter selections) and compose shared components.
- **`src/components/`** — shared components. Each lives in its own folder with a co-located `.module.scss`. Notable ones: `FilterBar`, `GrenadeCard`, `CrosshairCard`, `CrosshairSVG`, `Select`, `ImageModal`, `Header`, `Footer`.
- **`src/styles/_variables.scss`** — global SCSS design tokens (colors, spacing, `$header-height`, breakpoints). Import this whenever adding styled components.

## Data

Both data sets are loaded at build time via Vite `import.meta.glob` — there is no database or API.

- **Grenades** (`src/data/grenades.ts`): each lineup is a folder `src/data/grenades/<id>/` containing a `meta.json` (`description`, `side`, `type`, `map`) and three images. Images are matched by numeric prefix: `1.*` = stand, `2.*` = aim, `3.*` = result (`.jpg/.jpeg/.png/.webp`). `grenades.ts` globs all `meta.json` + images and exports `grenadeLineups: GrenadeLineup[]`. To add a lineup, drop a new folder in — no code changes needed.
- **Crosshairs** (`src/data/crosshairs.ts`): each crosshair is a file `src/data/crosshairs/*.json` (`code` + `params`). `crosshairs.ts` globs them and exports `crosshairs: Crosshair[]`. `CrosshairSVG` renders each one procedurally from `CrosshairParams` — no image assets.

Types: `GrenadeType = 'smoke' | 'molotov' | 'flash'`, `Side = 'T' | 'CT'`. `GrenadesPage` filters `grenadeLineups` by map, type, and side; the map list lives in `MAPS` in `GrenadesPage.tsx`.

## Key conventions

- Path alias `@/` resolves to `src/` (configured in `vite.config.ts` and `tsconfig.json`).
- CSS Modules (`.module.scss`) for all component styles. Global styles only in `src/styles/global.scss`.
- The layout is responsive (fluid grids + breakpoints `$bp-tablet`/`$bp-mobile` in `src/styles/_variables.scss`); it supports phones, tablets, and desktop.

## Deployment

Deployed to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`. Vite `base` is `/cs-book/`. The workflow copies `dist/index.html` to `dist/404.html` so client-side routes resolve under the subpath.
