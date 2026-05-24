# React Development Starter Template

This repository is a clean React starter for internal teams beginning new front-end projects, configured with a high-end **modular folder boundaries layout** and **scaffolding engines**.

It is designed to be:
- **ready for development on day one**
- **scalable for enterprise-sized applications**
- **consistent across teams using templates**

---

## Included by Default

- **React 19 + TypeScript strict mode**
- **Vite 7 + SWC** (1.8-second cold production build time)
- **Consolidated Shared Layer**: All foundation libraries, state, layouts, and helpers live isolated under `/src/shared/`.
- **Clean Feature-First Architecture**: Feature modules (like `auth/`) exist entirely encapsulated, preventing boundary leakage.
- **Repeatable DX Generators**: Full CLI templates to generate custom components, entire feature structures, and standalone page modules automatically.
- **Wired UI Shell**: Gorgeous pre-built responsive `Sidebar`, theme-aware user session `Header`, and interactive dark/light mode toggle.

---

## Requirements

- Node.js 22 recommended
- npm 10+

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Configure environment**:
   Copy `.env.example` to `.env` if needed:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   VITE_APP_NAME=SSO Portal
   VITE_APP_ENV=development
   ```
3. **Start the dev server**:
   ```bash
   npm run dev
   ```

---

## Commands

| Script | Purpose |
| :--- | :--- |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Build optimized client bundle for production |
| `npm run typecheck` | Run strict type validation on all codebase components |
| `npm run lint` | Run ESLint check over code layout rules |
| `npm run verify` | Full verification pipeline: runs lint, typecheck, and build sequentially |
| `npm run generate:feature <name>` | Scaffolds a complete feature module from boilerplate |
| `npm run generate:component <Name> [ui/layout/feedback]` | Scaffolds a shared component under `src/shared/components` |
| `npm run generate:page <Name> [feature]` | Scaffolds a page under `/src/app/` or `/src/features/` |

---

## Architecture Layout

```text
src/
  app/                    # Global routers, entry setups, and core bootstrap pages
  features/               # Encapsulated domain-specific logic modules
    auth/                 # Light authentication page, store hooks, and API clients
  shared/                 # Consolidated global layer (accessed via @/ aliases)
    components/           # Shared presentation layout elements
      ui/                 # Design inputs, form actions, buttons, and tables
      layout/             # Interactive layout wrappers, Header, and Sidebar
      feedback/           # UI loading spinners, error alerts, and empty states
    hooks/                # Global custom hooks (usePagination, useDebounce, etc.)
    lib/                  # Global library instantiations (API client, queries)
    styles/               # Global css variables and global transitions
    types/                # Base schemas and authentication types
    utils/                # Safe, explicit business helper utilities
  store/                  # State stores (Zustand session and UI layout)

scripts/
  generators/             # Code generation CLI executables
  templates/              # Standardized template files (.tpl) used by generators
```

---

## Folder Structure Rules (Mandatory vs Optional)

To keep the project clean, scalable, and modular, all developers (and AI assistants) must strictly adhere to the following architectural rules:

### 🔴 Mandatory Rules (Wajib Diikuti)

1. **Encapsulated Feature Modules (`src/features/[feature-name]/`)**:
   - Every domain-specific feature (e.g., `auth`, `dashboard`, `settings`) must reside inside its own folder under `src/features/`.
   - **NO Cross-Feature Imports**: A feature module MUST NOT import code directly from another feature module (e.g., `src/features/dashboard` cannot import from `src/features/auth`).
   - If a utility, hook, type, or component needs to be used by multiple features, it **MUST** be refactored and moved to the `src/shared/` layer (accessible via `@/components`, `@/hooks`, etc.).

2. **Clean Shared Layer (`src/shared/`)**:
   - Code inside `src/shared/` must be generic and have **zero knowledge** of any specific feature modules.
   - Always use the predefined TypeScript path aliases (e.g., `@/components/*`, `@/hooks/*`, `@/utils/*`) to import from the shared layer.

3. **No Direct Module Creep into `src/app/`**:
   - The `src/app/` folder should only contain entry-point files, routing setups (`routes.tsx`), global provider wrappers, and page bootstrapping.
   - Do not write domain logic, local feature components, or local feature state here.

4. **Strict TypeScript & Path Aliases**:
   - Do not use relative path imports (`../../../`) when targeting folders that have aliases (e.g., use `@/features/auth/pages/LoginPage` or `@/components/ui/Button`).
   - Strictly follow type declarations: **NO `any`**, **NO typecasting (`as`)**, and **NO loosely typed variables** (strict type safety must be maintained).

---

### 🟡 Optional / Flexible Rules (Bisa Diikuti/Disesuaikan)

1. **Sub-directories within `src/features/[feature-name]/`**:
   - While the scaffolding generator creates standard folders (`components/`, `hooks/`, `services/`, `schemas/`, `types/`, `pages/`), you do not have to keep or create all of them if the feature doesn't need them. For example, if a feature has no local custom hooks, the `hooks/` directory is not required.
   
2. **Shared Components Categories (`src/shared/components/`)**:
   - The sub-directories `ui/`, `layout/`, and `feedback/` are helper classifications. If a new shared component doesn't fit perfectly into these folders, you can place it in another appropriately named sub-folder under `src/shared/components/`.

3. **Global Zustand Stores (`src/store/`)**:
   - Only global application state (like user session or global UI theme layouts) should be placed in `src/store/`. Feature-specific state should be handled locally using standard React state or local state stores inside that feature's directory.

---

## Component Layering

### 1. `src/shared/components/ui`
Atomic elements and shared interactive building blocks. Examples: buttons, inputs, form indicators, dialog controls.

### 2. `src/shared/components/layout`
Structural frame containers including:
- **`Sidebar`**: Left-side responsive navigation listing links dynamically.
- **`Header`**: Top bar housing layout controls, user details, and light/dark theme switch.
- **`MainLayout`**: Outlet grid rendering sidebars and headers automatically as fallback components.
- **`AuthLayout`**: Glassmorphic layout page wrapper optimized for session control states.

---

## Dynamic Scaffold Engine

To generate consistent, predictable boilerplate code, the template includes robust generator scripts.

### Generators Directory: `/scripts`
All scaffolding templates are kept strictly decoupled from build scripts inside the [scripts/templates/](scripts/templates/) directory:
- **Features Boilerplate**: Generates local subfolders for `components/`, `hooks/`, `services/`, `schemas/`, `types/`, and `pages/` (prewired with clean, standard `"zod"` schemas instead of non-standard loaders).
- **Custom Compiling**: Scaffolds read the `.tpl` templates dynamically, interpolate custom naming tokens (`{{pascalCase}}`, `{{kebabCase}}`, `{{camelCase}}`), and generate type-safe files.

---

## TypeScript Expectations

This project is built to enforce type safety.
- **Prefer**: Explicit type declarations, narrow safe utility interfaces, and strict generic arguments.
- **Avoid**: Absolute type casting (`as`), `any` assignments, and loosely typed variables.
- Run `npm run typecheck` regularly during feature iterations to ensure type integrity.
