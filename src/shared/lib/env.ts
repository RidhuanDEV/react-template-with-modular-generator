import { z } from "zod/v4";

const envSchema = z.object({
  VITE_API_BASE_URL: z.url().default("http://localhost:8000/api"),
  VITE_APP_NAME: z.string().trim().min(1).default("Starter App"),
  VITE_APP_ENV: z
    .enum(["development", "staging", "production", "test"])
    .default("development"),
  VITE_THEME_PALETTE_NAME: z.string().trim().optional(),
  VITE_COLOR_PRIMARY: z.string().trim().optional(),
  VITE_COLOR_SECONDARY: z.string().trim().optional(),
  VITE_COLOR_ACCENT: z.string().trim().optional(),
  VITE_COLOR_BACKGROUND: z.string().trim().optional(),
});

const parsedEnv = envSchema.parse({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
  VITE_THEME_PALETTE_NAME: import.meta.env.VITE_THEME_PALETTE_NAME,
  VITE_COLOR_PRIMARY: import.meta.env.VITE_COLOR_PRIMARY,
  VITE_COLOR_SECONDARY: import.meta.env.VITE_COLOR_SECONDARY,
  VITE_COLOR_ACCENT: import.meta.env.VITE_COLOR_ACCENT,
  VITE_COLOR_BACKGROUND: import.meta.env.VITE_COLOR_BACKGROUND,
});

export const env = {
  API_BASE_URL: parsedEnv.VITE_API_BASE_URL,
  APP_NAME: parsedEnv.VITE_APP_NAME,
  APP_ENV: parsedEnv.VITE_APP_ENV,
  isDevelopment: parsedEnv.VITE_APP_ENV === "development",
  isProduction: parsedEnv.VITE_APP_ENV === "production",
  theme: {
    paletteName: parsedEnv.VITE_THEME_PALETTE_NAME ?? "default",
    colorPrimary: parsedEnv.VITE_COLOR_PRIMARY,
    colorSecondary: parsedEnv.VITE_COLOR_SECONDARY,
    colorAccent: parsedEnv.VITE_COLOR_ACCENT,
    colorBackground: parsedEnv.VITE_COLOR_BACKGROUND,
  },
} as const;
