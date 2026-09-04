# Antigravity Agent Guidelines

This document outlines the architectural standards, modern web practices, tech stack conventions, and strict coding rules for Antigravity and any AI assistant working in this repository.

---

## 1. Non-Negotiable Core Rules (User Directives)

1. **NO GIT FEATURES**:
   - Do NOT run any git commands (`git commit`, `git push`, `git checkout`, `git branch`, `git stash`, etc.).
   - Focus purely on writing clean, production-grade code.
2. **STRICT TYPESCRIPT PATTERN**:
   - **Forbidden**: `any`, `unknown`, or typecasting (`as SomeType` or `<SomeType>`).
   - **Requirement**: Every interface, function argument, return type, state, prop, and API response MUST have an explicitly defined type contract.
3. **DEADCODE CLEANUP**:
   - Always clean up unused imports, dead variables, obsolete types, commented-out dead code, and stale scaffolding files when adding or refactoring code.

---

## 2. Architectural Guidelines & Boundaries

### Feature-First Architecture (`src/features/<feature>/`)
- Each domain feature is completely encapsulated:
  ```text
  src/features/<feature>/
  ├── components/       # Feature-specific components
  ├── hooks/            # Feature-specific hooks (e.g., TanStack Query hooks)
  ├── services/         # Feature API clients and network calls
  ├── schemas/          # Zod validation schemas
  ├── types/            # Feature domain TypeScript interfaces
  └── pages/            # Feature entry pages
  ```
- **Zero Cross-Feature Imports**: A feature module must NEVER import from another feature module (e.g., `features/dashboard` cannot import from `features/auth`).
- **Shared Promotion**: If logic, types, or components are needed by multiple features, refactor and move them into `src/shared/`.

### Shared Layer (`src/shared/`)
- Contains generic foundation libraries, presentation components, hooks, and utilities.
- **Strict Isolation**: Code inside `src/shared/` must have **zero knowledge or dependencies** on any domain feature.

### Application Bootstrap (`src/app/`)
- Reserved strictly for route tree definitions (`routes.tsx`), global providers, and application root bootstrapping.
- No business logic or local feature components allowed here.

### Path Aliases
Always use configured path aliases instead of relative paths (`../../..`):
| Alias | Target Path | Purpose |
| :--- | :--- | :--- |
| `@/components/*` | `src/shared/components/*` | Shared UI, layout, and feedback components |
| `@/hooks/*` | `src/shared/hooks/*` | Global reusable React hooks |
| `@/lib/*` | `src/shared/lib/*` | Core library singletons (apiClient, queryClient, utils, logger) |
| `@/types/*` | `src/shared/types/*` | Global common TypeScript types |
| `@/utils/*` | `src/shared/utils/*` | Pure business utility functions |
| `@/styles/*` | `src/shared/styles/*` | Global styles and CSS variables |
| `@/*` | `src/*` | General root access (e.g. `@/features/*`, `@/store/*`, `@/app/*`) |

---

## 3. Technology Stack & Implementation Standards

### Styling & Design System
- **Tailwind CSS v4**:
  - Uses `@import "tailwindcss";` and `@theme inline` in [src/shared/styles/globals.css](file:///d:/Ridhuan%20Ngoding%20Moment/React/te/react-template-with-modular-generator/src/shared/styles/globals.css).
  - Colors use modern **OKLCH** tokens with full Dark Mode support (`@custom-variant dark`).
  - Do NOT create a legacy `tailwind.config.js`.
- **Class Merging**: Always use `cn(...)` from `@/lib/utils` (`clsx` + `tailwind-merge`).
- **Variants**: Use `class-variance-authority` (`cva`) for multi-variant components.
- **Existing Primitives**: Always inspect [src/shared/components/ui/](file:///d:/Ridhuan%20Ngoding%20Moment/React/te/react-template-with-modular-generator/src/shared/components/ui) first. There are 50+ pre-built components (Button, Input, Dialog, DataTable, Card, etc.). Reuse them before creating new ones.

### State Management & Data Fetching
- **Server State**: Use **TanStack Query v5** (`@tanstack/react-query`).
  - Access client singleton from `@/lib/queryClient`.
  - Encapsulate queries and mutations into custom hooks in the feature's `hooks/` directory.
- **Global UI/Client State**: Use **Zustand v5** in `src/store/` (e.g., session auth, theme, sidebar toggle). Feature-specific state stays local to the feature.
- **Forms & Validation**: Use `react-hook-form` paired with `zod` via `@hookform/resolvers/zod`.
- **HTTP Client**: Use the configured Axios instance in `@/lib/apiClient`.
- **Notifications**: Use `sonner` (`toast.success()`, `toast.error()`).
- **Icons**: Use `lucide-react`.

---

## 4. Scaffolding CLI Commands

Always utilize the built-in scaffolding scripts to maintain architectural consistency:
```bash
npm run generate:feature <name>                        # Scaffold a new feature module
npm run generate:component <Name> [ui/layout/feedback] # Scaffold a shared component
npm run generate:page <Name> [feature]                 # Scaffold a standalone page
```

---

## 5. Modern Web Guidance & Platform Standards

This workspace has the **Modern Web Guidance** skill installed under `.agents/skills/modern-web-guidance/`.

- **Target Standard**: Baseline Widely Available (prefer native web APIs, HTML5 standards, and modern CSS before reaching for external dependencies).
- **Native Platform First**:
  - UI/Layout: Native `<dialog>`, HTML Popover API, CSS Anchor Positioning, Container Queries (`@container`), CSS `:has()`, CSS `:user-valid`.
  - Motion & Transitions: Document View Transitions API, CSS Scroll-driven animations.
  - Performance: Fetch Priority (`fetchpriority="high"`), `content-visibility`, native image/media lazy loading.
- **CLI Commands for Querying Guides**:
  - Search use cases:
    ```bash
    npx modern-web-guidance search "<query>"
    ```
  - Retrieve detailed guide:
    ```bash
    npx modern-web-guidance retrieve "<guide-id>"
    ```

---

## 6. Verification Pipeline

After making any code changes or refactoring, always run:
```bash
npm run typecheck
```
Ensure zero type errors, zero dead code, and that all contracts remain strict and sound.
