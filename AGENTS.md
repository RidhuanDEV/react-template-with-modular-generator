# Antigravity & AI Agent Guidelines

> **Target Audience**: Autonomous AI Agents (Antigravity, Claude, Cursor, Copilot) & Human Engineers  
> **Repository**: Enterprise React Modular Starter with Modular Generator  
> **Tech Stack**: React 19 • Vite 8 • Tailwind CSS v4 • TypeScript 5.8+ • TanStack Query v5 • Zustand v5 • Zod v4 • React Hook Form • i18next

---

## 1. Non-Negotiable Core Directives

Any AI agent or developer modifying this repository **MUST** adhere strictly to these 4 absolute rules:

1. **NO GIT FEATURES**:
   - **FORBIDDEN**: Running any git CLI commands (`git commit`, `git push`, `git checkout`, `git branch`, `git stash`, `git reset`, etc.).
   - **REQUIREMENT**: Focus purely on writing clean, verified, production-grade code on disk. When finished, provide copy-pasteable Git terminal commands for the developer to execute manually.

2. **STRICT TYPESCRIPT CONTRACTS**:
   - **FORBIDDEN**: `any`, `unknown`, and type assertions/typecasting (`as SomeType` or `<SomeType>`).
   - **REQUIREMENT**: Every interface, function signature, state variable, component prop, hook return, and API response MUST have an explicitly declared type contract. Use custom type guards (`value is Type`), generic parameters (`<T,>`), or Zod inference (`z.infer<typeof Schema>`).

3. **DEAD CODE & STALE ARTIFACT CLEANUP**:
   - **REQUIREMENT**: Always clean up unused imports, dead variables, obsolete types, commented-out dead code, and stale scaffolding artifacts during and after any code modification.

4. **ZERO CROSS-FEATURE IMPORTS**:
   - **FORBIDDEN**: Importing from one feature into another (e.g., `src/features/dashboard` importing from `src/features/auth`).
   - **REQUIREMENT**: Shared logic, presentation components, common models, or utilities needed by multiple domains MUST be promoted to `src/shared/`.

---

## 2. Codebase Architecture & Anatomy

This repository uses a **Feature-First Modular Architecture** with strict layer isolation:

```text
react-template-with-modular-generator/
├── .agents/skills/              # Specialized agent skills (e.g., modern-web-guidance)
├── AGENTS.md                    # Core agent directives & architecture
├── CLAUDE.md                    # Quick command cheatsheet & context guide
├── DESIGN.md                    # OKLCH tokens, design system, UI/UX specs
├── scripts/
│   ├── generators/              # Scaffolding generators (tsx-powered)
│   │   ├── feature.generator.ts
│   │   ├── component.generator.ts
│   │   └── page.generator.ts
│   └── templates/               # Modular code scaffolding templates
├── src/
│   ├── app/                     # Application Bootstrap & Shell
│   │   ├── pages/               # Top-level standalone pages (Dashboard, NotFound, etc.)
│   │   ├── App.tsx              # Root app wrapper
│   │   ├── providers.tsx        # Global provider tree (QueryClient, Auth, i18n, etc.)
│   │   └── router.tsx           # Global route configuration & lazy boundaries
│   ├── config/                  # Global Config & Constants
│   │   ├── constants.ts         # Query keys, storage keys, API endpoints
│   │   ├── permissions.ts       # Role & permission definitions
│   │   └── routes.ts            # Centralized typed route constants (ROUTES.*)
│   ├── features/                # Vertical Domain Features (Self-Contained)
│   │   ├── auth/                # Authentication domain (login, register, session)
│   │   └── settings/            # User settings domain (profile, appearance, security)
│   ├── locales/                 # Internationalization (i18n)
│   │   ├── en/ & id/            # Multi-namespace translation JSONs
│   │   ├── i18n.ts              # i18next instance setup
│   │   └── i18next.d.ts         # Strict TypeScript augmentations for i18next
│   ├── shared/                  # Agnostic Foundation Layer (Zero Domain Knowledge)
│   │   ├── components/
│   │   │   ├── ui/              # 50+ atomic, accessible UI primitives (Buttons, Dialogs, etc.)
│   │   │   ├── layout/          # Shell layouts (Sidebar, Header, MainLayout, NavUser)
│   │   │   └── feedback/        # Loading overlays, Error boundaries, Empty states
│   │   ├── hooks/               # Universal reusable hooks (useDebounce, useMediaQuery, etc.)
│   │   ├── lib/                 # Core singletons (apiClient, queryClient, logger, utils)
│   │   ├── styles/              # globals.css (Tailwind CSS v4 + OKLCH design tokens)
│   │   ├── types/               # Universal DTOs & API contracts (api, auth, common)
│   │   └── utils/               # Pure business utility helpers (formatting, validation)
│   └── store/                   # Global Client State (Zustand v5)
│       ├── auth.store.ts        # Client session auth store (persisted)
│       └── ui.store.ts          # Theme & sidebar layout store (persisted)
```

---

## 3. Path Aliases

Always utilize the configured Vite path aliases instead of relative directory traversals (`../../..`):

| Path Alias | Target Directory | Responsibility |
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

## 4. Feature Anatomy Guidelines (`src/features/<feature>/`)

Every feature module is completely self-contained and encapsulates its own lifecycle:

```text
src/features/<feature>/
├── components/       # Feature-specific presentation and UI components
├── hooks/            # TanStack Query hooks (queries, mutations)
├── services/         # Axios API calls typed with ApiResponse<T>
├── schemas/          # Zod validation schemas and form types
├── types/            # Domain TypeScript models and DTOs
├── pages/            # Feature route entry pages
└── index.ts          # Public export barrel for the feature
```

### Golden Rules for Features:
1. **No External Feature Leaks**: Do not expose internal feature details across other features.
2. **Promotion to Shared**: If logic, schemas, or UI are needed across multiple features, immediately promote them to `src/shared/`.
3. **No Direct Axios in Components**: Components must always call custom hooks in `hooks/`, which delegate to `services/`.

---

## 5. UI & Styling Conventions (Tailwind CSS v4)

- **Native Tailwind CSS v4**:
  - Configuration is inline in `src/shared/styles/globals.css` via `@import "tailwindcss";` and `@theme inline`.
  - Do **NOT** create a legacy `tailwind.config.js`.
  - Colors use modern **OKLCH** color tokens with full Dark Mode support (`@custom-variant dark`).
- **Interactive Cursor Behavior**:
  - Tailwind CSS v4 preflight removes default `cursor: pointer` from `<button>` and clickable elements.
  - Base rules in `globals.css` restore standard pointer styling on buttons, links, inputs, and interactive roles.
  - When writing interactive components, explicitly maintain `cursor-pointer` (with `disabled:cursor-not-allowed` and `disabled:pointer-events-none`) across buttons, triggers, tabs, and clickable cards.
- **Class Merging**: Always use `cn(...)` from `@/lib/utils` (combines `clsx` and `tailwind-merge`).
- **Variant Handling**: Use `class-variance-authority` (`cva`) for multi-variant components.
- **50+ Pre-built UI Primitives**: Always inspect `src/shared/components/ui/` first before creating new UI controls. Reuse `Button`, `Input`, `Dialog`, `DataTable`, `Card`, `DropdownMenu`, `Tabs`, `Pagination`, etc.
- **Design System Specification**: Consult [DESIGN.md](DESIGN.md) for the complete OKLCH color palette table, typography scale, radii values, elevation levels, and motion standards.

---

## 6. Layout & Navigation Architecture

The application provides a responsive, dual-mode navigation shell:

- **Sidebar (`Sidebar.tsx`)**:
  - **Expanded Mode (`sidebarOpen: true`)**: Full width `16rem` (`w-64`), categorized navigation sections (e.g. *Platform*, *Settings*), clear Lucide icons, full text labels, user avatar footer with name/email, and direct logout button.
  - **Collapsed Icon-Rail Mode (`sidebarOpen: false`)**: Desktop mini icon-rail `4.5rem` (`md:grid-cols-[4.5rem_1fr]`). Icons remain centered and visible with accessibility tooltips (`title` and `aria-label`). Sidebar never vanishes abruptly on desktop.
- **Main Layout Grid (`MainLayout.tsx`)**:
  - Smooth CSS grid transitions: `sidebarOpen ? "grid-cols-[16rem_1fr]" : "grid-cols-[0rem_1fr] md:grid-cols-[4.5rem_1fr]"`.
  - On mobile screens (`< md`), collapsed state collapses cleanly to `0rem`.

---

## 7. Data Fetching & State Management Standard

- **Server State**: Use **TanStack Query v5** (`@tanstack/react-query`).
  - Client singleton configured in `@/lib/queryClient`.
  - Encapsulate all queries and mutations into feature-specific hooks.
  - Cache invalidation and query keys defined in `@/config/constants.ts` (`QUERY_KEYS.*`).
- **Global Client State**: Use **Zustand v5** (`zustand` & `zustand/middleware`).
  - Auth session: `useAuthStore` in `src/store/auth.store.ts` (persists token and user in storage).
  - Theme and layout: `useUIStore` in `src/store/ui.store.ts` (persists theme and layout preferences).
- **Forms**: Use `react-hook-form` with `@hookform/resolvers/zod`.
- **Notifications**: Use `sonner` via `@/components/ui/Toast` (`toast.success()`, `toast.error()`).
- **Icons**: Use `lucide-react` ([https://lucide.dev/](https://lucide.dev/) • Directory: [https://lucide.dev/icons](https://lucide.dev/icons)).

---

## 8. Built-In Scaffolding CLI Commands

Always utilize the built-in scaffolding scripts to maintain architectural consistency:

```bash
# Scaffold a new feature module with full directory hierarchy
npm run generate:feature <name>

# Scaffold a shared UI/layout/feedback component
npm run generate:component <Name> [ui/layout/feedback]

# Scaffold a standalone page
npm run generate:page <Name> [feature]
```

---

## 9. Modern Web Guidance Skill

This repository has the **Modern Web Guidance** skill installed under `.agents/skills/modern-web-guidance/`.

- **Philosophy**: Baseline Widely Available (prefer native web APIs, HTML5 standards, and modern CSS before adding external libraries).
- **Key References**:
  - UI/Layout: Native `<dialog>`, HTML Popover API, CSS Anchor Positioning, Container Queries (`@container`), CSS `:has()`, CSS `:user-valid`.
  - Motion: Document View Transitions API, CSS Scroll-driven animations.
  - Performance: Fetch Priority (`fetchpriority="high"`), `content-visibility`, native image/media lazy loading.
- **CLI Commands for Querying Guides**:
  ```bash
  npx modern-web-guidance search "<query>"
  npx modern-web-guidance retrieve "<guide-id>"
  ```

---

## 10. Developer & Agent Verification Pipeline

Before completing any task, always execute the verification pipeline:

```bash
# 1. Typecheck: Verify 0 type errors, 0 any/unknown, and strict contracts
npm run typecheck

# 2. Lint: Verify 0 ESLint warnings or errors
npm run lint

# 3. Production Build: Verify clean Rollup/Vite bundling
npm run build

# Or run all 3 combined:
npm run verify
```

When all verification steps pass, format clean terminal Git commands for the user to execute manually.
