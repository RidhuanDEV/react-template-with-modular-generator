import { z } from "zod/v4";

const envSchema = z.object({
  VITE_API_BASE_URL: z.url().default("http://localhost:8000/api"),
  VITE_APP_NAME: z.string().trim().min(1).default("Starter App"),
  VITE_APP_ENV: z
    .enum(["development", "staging", "production", "test"])
    .default("development"),
});

const parsedEnv = envSchema.parse({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
});

export const env = {
  API_BASE_URL: parsedEnv.VITE_API_BASE_URL,
  APP_NAME: parsedEnv.VITE_APP_NAME,
  APP_ENV: parsedEnv.VITE_APP_ENV,
  isDevelopment: parsedEnv.VITE_APP_ENV === "development",
  isProduction: parsedEnv.VITE_APP_ENV === "production",
} as const;
