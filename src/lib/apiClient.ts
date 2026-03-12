import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { ApiError } from "@/types/api.types";
import { ROUTES } from "@/config/routes";
import { env } from "./env";
import { logger } from "./logger";
import { useAuthStore } from "@/store/auth.store";

class ApiClientError extends Error implements ApiError {
  status: number;
  errors?: Record<string, string[]>;

  constructor({ message, status, errors }: ApiError) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.errors = errors;
  }
}

const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    logger.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    logger.error("[API] Request interceptor error", error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const status = error.response?.status;
    const message = error.response?.data?.message ?? error.message;

    logger.error(`[API] Response error: ${status} - ${message}`);

    if (status === 401) {
      logger.warn("[API] Unauthorized response received. Clearing session.");
      useAuthStore.getState().logout();

      if (window.location.pathname !== ROUTES.LOGIN) {
        window.history.replaceState({}, "", ROUTES.LOGIN);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
    }

    const normalizedError = new ApiClientError({
      message,
      status: status ?? 500,
      errors: error.response?.data?.errors,
    });

    return Promise.reject(normalizedError);
  },
);

export { apiClient };
