# Aurora Hospitality Hub

A multi-branch restaurant operations dashboard built with React, Tailwind CSS, i18next, and Recharts. The project covers Phase 0 (foundation) and Phase 1 (MVP core) of the delivery plan, including routing, RBAC, tenant context, internationalization, and core modules for bookings, tables, customers, and analytics.

## Getting started

```bash
npm install
npm run dev
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server. |
| `npm run build` | Generate a production build. |
| `npm run preview` | Preview the production build. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Run TypeScript in noEmit mode. |
| `npm run test` | Execute Jest tests with coverage. |
| `npm run test:ci` | Run Jest in CI mode. |
| `npm run coverage` | Generate coverage report with ≥80% thresholds. |
| `npm run e2e` | Execute Playwright tests. |
| `npm run e2e:ci` | Execute Playwright tests with list reporter. |

## Project structure

```
src/
  app/          # Providers, router, layout
  modules/      # Feature modules (analytics, bookings, tables, customers, settings)
  shared/       # Shared components, hooks, utilities
  store/        # App state, data seeds, types
```

## Continuous integration

GitHub Actions workflow `.github/workflows/ci.yml` runs lint, typecheck, unit tests with coverage (≥80%), build, and Playwright E2E smoke tests on pushes and pull requests targeting `main`.
