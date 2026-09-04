# React Enterprise Starter Template (Modular & i18n Ready)

This repository is a production-grade React 19 starter for building scalable, high-performance web applications with a **modular folder boundaries layout**, **built-in scaffolding engines**, **full authentication & settings workflows**, and **enterprise internationalization (i18n)**.

It is designed to be:

- **Ready for development on day one** with zero extra setup needed
- **Feature-complete** (Full Auth flow, User Settings, 2FA, Browser Sessions, Dual Layouts)
- **Scalable for enterprise-sized applications** using Feature-Driven Architecture
- **Multi-language ready (i18n)** with instant English (US) and Bahasa Indonesia switching
- **Strictly typed with zero `any` / type assertions**

---

## Included by Default

- **React 19 + TypeScript strict mode**
- **Vite 7 + SWC** (Instant HMR & sub-second production builds)
- **Multi-Language i18n Engine**: Powered by `i18next` and `react-i18next` with strict type safety and language persistence in `localStorage`.
- **Complete Authentication Flow**: `LoginPage`, `RegisterPage`, `ForgotPasswordPage`, `ResetPasswordPage`, `VerifyEmailPage`, and `ConfirmPasswordPage`.
- **Complete User Settings & Account Management**: `ProfilePage`, `AppearancePage` (Light/Dark/System theme switcher), and `SecurityPage` (Password update, 2FA QR code setup, active Browser Sessions, and permanent account deletion modal).
- **Dual Application Layouts**: Freely switch between `AppSidebarLayout` (collapsible left sidebar) and `AppHeaderLayout` (modern horizontal top navbar).
- **Auth Layout Variants**: `AuthSplitLayout` (rich split-screen with branding & testimonials), `AuthCardLayout` (floating centered card), and `AuthSimpleLayout`.
- **40+ Primitive UI Components**: Built on Radix UI primitives with Tailwind CSS v4 design tokens.
- **Repeatable DX Generators**: Full CLI templates to generate custom components, entire feature structures, and standalone page modules automatically.

---

## Requirements

- Node.js 22+ recommended
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
   VITE_APP_NAME=Starter App
   VITE_APP_ENV=development
   ```
3. **Start the dev server**:
   ```bash
   npm run dev
   ```

---

## Commands

| Script                                                   | Purpose                                                                  |
| :------------------------------------------------------- | :----------------------------------------------------------------------- |
| `npm run dev`                                            | Start the local Vite development server                                  |
| `npm run build`                                          | Build optimized client bundle for production                             |
| `npm run typecheck`                                      | Run strict type validation on all codebase components                    |
| `npm run lint`                                           | Run ESLint check over code layout & React Compiler rules                 |
| `npm run verify`                                         | Full verification pipeline: runs lint, typecheck, and build sequentially |
| `npm run generate:feature <name>`                        | Scaffolds a complete feature module from boilerplate                     |
| `npm run generate:component <Name> [ui/layout/feedback]` | Scaffolds a shared component under `src/shared/components`               |
| `npm run generate:page <Name> [feature]`                 | Scaffolds a page under `/src/app/` or `/src/features/`                   |

---

## Multi-Language (i18n) Support

The template comes pre-configured with **English (`en`)** and **Bahasa Indonesia (`id`)**.

### How to Use Translations in Components:

```tsx
import { useTranslation } from "react-i18next";

export const MyComponent: React.FC = () => {
  const { t } = useTranslation(["common", "auth"]);

  return (
    <div>
      <h1>{t("auth:signIn")}</h1>
      <button>{t("common:save")}</button>
    </div>
  );
};
```

### Adding a New Language:

1. Create a new folder under `src/locales/{languageCode}/` (e.g., `src/locales/ms/` for Malay or `src/locales/ja/` for Japanese).
2. Copy `common.json`, `auth.json`, `settings.json`, and `dashboard.json` into the new folder and translate the values.
3. Register the new language in `src/locales/i18n.ts` under `resources` and `SUPPORTED_LANGUAGES`.

---

## Architecture Layout

```text
src/
  app/                    # Global routers, entry setups, and core bootstrap pages
  config/                 # Global routes, permissions, constants
  features/               # Encapsulated domain-specific logic modules
    auth/                 # Complete authentication flows, hooks, schemas, and pages
    settings/             # User profile, appearance, security, 2FA, and session management
  locales/                # i18n translation namespaces (en, id, etc.) and configuration
  shared/                 # Consolidated global layer (accessed via @/ aliases)
    components/           # Shared presentation elements
      ui/                 # 40+ Primitive UI components, PasswordInput, LanguageSelector, etc.
      layout/             # Dual layout wrappers, Auth layouts, Header, and Sidebar
      feedback/           # UI loading spinners, error alerts, and empty states
    hooks/                # Global custom hooks (usePagination, useDebounce, etc.)
    lib/                  # Global library instantiations (API client, queries)
    styles/               # Global CSS variables and transitions
    types/                # Base schemas and authentication types
    utils/                # Safe, explicit business helper utilities
  store/                  # Zustand state stores (session, theme, UI layout)

scripts/
  generators/             # Code generation CLI executables
  templates/              # Standardized template files (.tpl) used by generators
```
