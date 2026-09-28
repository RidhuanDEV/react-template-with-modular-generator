/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_APP_NAME?: string;
  readonly VITE_APP_ENV?: "development" | "staging" | "production" | "test";
  readonly VITE_THEME_PALETTE_NAME?: string;
  readonly VITE_COLOR_PRIMARY?: string;
  readonly VITE_COLOR_SECONDARY?: string;
  readonly VITE_COLOR_ACCENT?: string;
  readonly VITE_COLOR_BACKGROUND?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
