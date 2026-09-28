# CLAUDE.md - AI & Developer Context Guide

Welcome to the **Enterprise React Modular Starter with Modular Generator**.  
This document serves as the immediate initialization context for Claude Code, Antigravity, AI assistants, and human engineers.

---

## 1. Quick Reference: Core Commands

```bash
# Development server (Vite 8)
npm run dev

# Verification & Quality Checks
npm run typecheck    # Strict TypeScript check (0 errors required)
npm run lint         # ESLint 9 check (0 errors/warnings required)
npm run build        # Production bundle check (tsc -b && vite build)
npm run verify       # Runs lint, typecheck, and build in sequence

# Code Formatting
npm run format       # Prettier write
npm run format:check # Prettier check

# Built-in Modular Generators (TSX Scaffolding)
npm run generate:feature <name>                        # New domain feature module
npm run generate:component <Name> [ui/layout/feedback] # New shared component
npm run generate:page <Name> [feature]                 # New standalone or feature page
```

---

## 2. Non-Negotiable Core Directives

1. **NO GIT FEATURES**:
   - **DO NOT** execute any git CLI commands (`git commit`, `git push`, `git checkout`, `git branch`, `git stash`, etc.).
   - Focus exclusively on writing clean, production-grade code.
   - At the conclusion of your work, output copy-pasteable Git commands for the user.

2. **STRICT TYPESCRIPT (NO LOOSE TYPES)**:
   - **Strictly Forbidden**: `any`, `unknown`, and type assertions/typecasting (`as SomeType` or `<SomeType>`).
   - Every interface, function signature, state variable, component prop, hook return, and API response MUST have an explicitly declared type contract.
   - Use custom type guards (`value is Type`), generic parameters (`<T,>`), or Zod inference (`z.infer<typeof Schema>`).

3. **DEAD CODE CLEANUP**:
   - Clean up unused imports, dead variables, obsolete types, commented-out dead code, and stale scaffolding artifacts.

4. **ZERO CROSS-FEATURE IMPORTS**:
   - A feature in `src/features/<A>` must **NEVER** import from `src/features/<B>`.
   - Shared logic, presentation components, common models, or utilities needed by multiple domains MUST be promoted to `src/shared/`.

---

## 3. Architecture & Directory Boundaries

```text
src/
├── app/                     # Application Bootstrap & Shell
│   ├── pages/               # Top-level standalone pages (Dashboard, NotFound, Unauthorized, Welcome)
│   ├── App.tsx              # Root app wrapper
│   ├── providers.tsx        # Global provider tree (QueryClient, Auth, i18n, etc.)
│   └── router.tsx           # Global route configuration & lazy boundaries
├── config/                  # Global Config & Constants
│   ├── constants.ts         # Query keys, storage keys, API endpoints
│   ├── permissions.ts       # Role & permission definitions
│   └── routes.ts            # Centralized typed route constants (ROUTES.*)
├── features/                # Vertical Domain Features (Self-Contained)
│   ├── auth/                # Authentication domain (login, register, session)
│   └── settings/            # User settings domain (profile, appearance, security)
├── locales/                 # Internationalization (i18n)
│   ├── en/ & id/            # Multi-namespace translation JSONs
│   ├── i18n.ts              # i18next instance setup
│   └── i18next.d.ts         # Strict TypeScript augmentations for i18next
├── shared/                  # Agnostic Foundation Layer (Zero Domain Knowledge)
│   ├── components/
│   │   ├── ui/              # 50+ atomic, accessible UI primitives (Buttons, Dialogs, etc.)
│   │   ├── layout/          # Shell layouts (Sidebar, Header, MainLayout, NavUser)
│   │   └── feedback/        # Loading overlays, Error boundaries, Empty states
│   ├── hooks/               # Universal reusable hooks (useDebounce, useMediaQuery, etc.)
│   ├── lib/                 # Core singletons (apiClient, queryClient, logger, utils)
│   ├── styles/              # globals.css (Tailwind CSS v4 + OKLCH design tokens)
│   ├── types/               # Universal DTOs & API contracts (api, auth, common)
│   └── utils/               # Pure business utility helpers (formatting, validation)
└── store/                   # Global Client State (Zustand v5)
    ├── auth.store.ts        # Client session auth store (persisted)
    └── ui.store.ts          # Theme & sidebar layout store (persisted)
```

---

## 4. Path Aliases

Always utilize the configured Vite path aliases instead of relative directory traversals (`../../..`):

| Path Alias | Target Directory | Purpose |
| :--- | :--- | :--- |
| `@/components/*` | `src/shared/components/*` | Shared UI primitives, feedback, and layout elements |
| `@/hooks/*` | `src/shared/hooks/*` | Universal React utility hooks |
| `@/lib/*` | `src/shared/lib/*` | Core client singletons (`apiClient`, `queryClient`, `logger`, `utils`) |
| `@/types/*` | `src/shared/types/*` | Global shared TypeScript interfaces and types |
| `@/utils/*` | `src/shared/utils/*` | Pure business utility functions |
| `@/styles/*` | `src/shared/styles/*` | Global Tailwind CSS v4 variables & OKLCH tokens |
| `@/config/*` | `src/config/*` | Route constants, permissions, and app constants |
| `@/locales/*` | `src/locales/*` | i18n configuration and dictionary files |
| `@/store/*` | `src/store/*` | Zustand global stores |
| `@/features/*` | `src/features/*` | Domain feature modules |
| `@/*` | `src/*` | General root access |

---

## 5. UI, Styling & Interaction Standards

- **Tailwind CSS v4**:
  - Uses `@import "tailwindcss";` and `@theme inline` in `src/shared/styles/globals.css`.
  - Colors use modern **OKLCH** tokens with full Dark Mode support (`@custom-variant dark`).
  - Do NOT create a legacy `tailwind.config.js`.
- **Interactive Cursor Behavior**:
  - Tailwind CSS v4 preflight removes default `cursor: pointer` from `<button>` and clickable elements.
  - Interactive elements (buttons, links, select, tabs, clickable cards) must have `cursor-pointer` (with `disabled:cursor-not-allowed` and `disabled:pointer-events-none`).
- **Class Merging**: Always use `cn(...)` from `@/lib/utils` (combines `clsx` and `tailwind-merge`).
- **Variants**: Use `class-variance-authority` (`cva`) for multi-variant components.
- **50+ Pre-built UI Primitives**: Always inspect `src/shared/components/ui/` first before creating new UI controls. Reuse `Button`, `Input`, `Dialog`, `DataTable`, `Card`, `DropdownMenu`, `Tabs`, `Pagination`, etc.
- **Iconography**: Use `lucide-react` ([https://lucide.dev/](https://lucide.dev/) • Directory: [https://lucide.dev/icons](https://lucide.dev/icons)).
- **Design System Specification**: Refer to `DESIGN.md` for full OKLCH color palettes, typography scale, radii values, elevation levels, and motion standards.

---

## 6. Layout & Navigation Architecture

- **Sidebar (`Sidebar.tsx`)**:
  - **Expanded Mode (`sidebarOpen: true`)**: Width `16rem` (`w-64`), categorized navigation sections (e.g. *Platform*, *Settings*), Lucide icons, full text labels, user avatar footer with name/email, direct logout button, and collapse button (`PanelLeftClose`).
  - **Collapsed Icon-Rail Mode (`sidebarOpen: false`)**: Desktop mini icon-rail `4.5rem` (`md:grid-cols-[4.5rem_1fr]`). Icons remain centered and visible with accessibility tooltips (`title` and `aria-label`). Sidebar never vanishes abruptly on desktop.
- **Main Layout Grid (`MainLayout.tsx`)**:
  - Smooth CSS grid transitions: `sidebarOpen ? "grid-cols-[16rem_1fr]" : "grid-cols-[0rem_1fr] md:grid-cols-[4.5rem_1fr]"`.
  - Mobile screens (`< md`): Collapsed state collapses cleanly to `0rem`.

---

## 7. Data Flow Pattern

1. **Service Layer** (`src/features/<feature>/services/<feature>.service.ts`):
   - Makes Axios network calls via `apiClient`.
   - Returns typed responses (`ApiResponse<T>`).
2. **Hook Layer** (`src/features/<feature>/hooks/use<Feature>.ts`):
   - Encapsulates TanStack Query v5 `useQuery` or `useMutation`.
   - Manages cache keys (`QUERY_KEYS.*`) and invalidations.
3. **Component Layer** (`src/features/<feature>/components/` or `pages/`):
   - Consumes hooks only.
   - Never calls Axios or `apiClient` directly.
4. **Global UI/Auth State**:
   - Managed via Zustand v5 in `src/store/`.
   - Use `useAuthStore` for session token & user data.
   - Use `useUIStore` for sidebar toggle, theme, and layout mode.

---

## 8. Verification Before Completing Any Work

Always execute:
```bash
npm run verify
```
Ensure 0 type errors, 0 lint warnings, 0 dead code, and clean production build.
