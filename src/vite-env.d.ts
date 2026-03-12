/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_APP_NAME?: string;
  readonly VITE_APP_ENV?: "development" | "staging" | "production" | "test";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
