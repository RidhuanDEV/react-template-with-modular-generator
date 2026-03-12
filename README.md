# React Development Starter Template

This repository is a clean React starter for internal teams beginning new front-end projects.

It is designed to be:

- ready for development on day one
- scalable for enterprise-sized applications
- flexible enough for different teams to add their own tooling choices later

It is intentionally **not** a deployment template.

## Included by default

- React 19 + TypeScript strict mode
- Vite 7 + SWC
- feature-first project structure
- reusable component layers: `ui`, `layout`, and `feedback`
- React Query, Zustand, React Hook Form, and Zod baseline
- auth example architecture:
  - login page
  - auth store
  - API client
  - protected route
  - permission guard
- generator scripts for repeatable team scaffolding

## Intentionally not included

- CI pipelines
- deployment workflows
- GitHub Actions
- a forced testing baseline

Teams can add their own CI, deployment, and testing approach later based on project needs.

## Requirements

- Node.js 22 recommended
- npm 10+

## Quick start

1. Install dependencies.
2. Copy `.env.example` to `.env` if needed.
3. Start the dev server.

Example environment:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Starter App
VITE_APP_ENV=development
```

## Scripts

| Script                                             | Purpose                                 |
| -------------------------------------------------- | --------------------------------------- |
| `npm run dev`                                      | Start the development server            |
| `npm run build`                                    | Build the starter in production mode    |
| `npm run typecheck`                                | Run strict TypeScript validation        |
| `npm run lint`                                     | Run ESLint across the workspace         |
| `npm run verify`                                   | Run lint, typecheck, and build          |
| `npm run preview`                                  | Preview the built application locally   |
| `npm run format`                                   | Format source files with Prettier       |
| `npm run format:check`                             | Check formatting without changing files |
| `npm run generate:feature <name>`                  | Generate a full feature module          |
| `npm run generate:component <Name> [subdirectory]` | Generate a shared component             |
| `npm run generate:page <Name> [feature]`           | Generate an app page or feature page    |

## Project structure

```text
src/
  app/
  components/
    ui/
    layout/
    feedback/
  features/
  hooks/
  services/
  store/
  schemas/
  lib/
  config/
  types/
  utils/
  styles/

scripts/
  generators/
  templates/
```

## Component layering

### `src/components/ui`

Reusable UI building blocks and shared interactive components.

Examples:

- buttons, inputs, tables, dialogs
- data table helpers
- search, filters, and date pickers

### `src/components/layout`

Application structure and page framing components.

Examples:

- auth layout
- main layout
- protected route wrappers
- page header and page container

### `src/components/feedback`

Feedback-oriented UI for loading, empty, and error states.

Examples:

- error fallback
- loading overlay
- empty state

## Feature architecture

Each feature should live under `src/features/<feature-name>/` and can contain:

- `components/`
- `hooks/`
- `services/`
- `schemas/`
- `types/`
- `pages/`

This keeps domain logic close together and scales better for multiple teams.

## Auth baseline

The starter keeps a lightweight but useful auth example architecture:

- `LoginPage`
- `useAuthStore`
- `apiClient`
- `ProtectedRoute`
- `PermissionGuard`
- `AuthBootstrap`

This gives teams a clear starting pattern without forcing a full security platform into every new project.

## Generators

The generator scripts are kept intentionally because they help teams stay consistent.

### Feature generator

Creates:

- `components`
- `hooks`
- `services`
- `schemas`
- `types`
- `pages`

### Component generator

Creates a component under `src/components/<subdirectory>/`.

### Page generator

Creates either:

- `src/app/pages/<Name>Page.tsx`
- or `src/features/<feature>/pages/<Name>Page.tsx`

## TypeScript expectations

This starter is meant to stay strict and safe.

Prefer:

- explicit typing
- narrow, safe generics
- feature-local types and schemas

Avoid:

- `any`
- unsafe casts
- loosely typed shared utilities

## Testing policy

Testing is intentionally **not scaffolded by default**.

That means the starter does not include:

- sample test files
- a prewired `src/test` baseline
- forced test scripts

Teams can add Vitest, Jest, Playwright, Cypress, or another testing stack when the project actually needs it.

## Notes for teams adopting this starter

Common next steps after creating a new project from this template:

- customize branding and app metadata
- wire the API client to the real backend
- adapt permission constants to the project domain
- add project-specific layouts and navigation
- choose a test stack only when the team is ready
- add CI/deployment separately in the target repository
