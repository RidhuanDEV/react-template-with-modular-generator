import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import type { ApiError } from "@/types/api.types";
import { logger } from "./logger";

const getErrorStatus = (error: unknown): number | undefined => {
  if (axios.isAxiosError<ApiError>(error)) {
    return error.response?.status;
  }

  if (typeof error === "object" && error !== null && "status" in error) {
    const status = Reflect.get(error, "status");
    return typeof status === "number" ? status : undefined;
  }

  return undefined;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: (failureCount, error) => {
        const status = getErrorStatus(error);
        if (status === 401 || status === 403 || status === 404) return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        logger.error("[Mutation Error]", error);
      },
    },
  },
});
