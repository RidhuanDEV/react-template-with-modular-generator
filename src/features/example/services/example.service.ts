import { apiClient } from "@/lib/apiClient";
import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from "@/types/api.types";
import type { ExampleItem } from "../types/example.types";
import { buildPaginationQueryString } from "@/utils/pagination";

export const exampleService = {
  list: async (
    params: PaginationParams,
  ): Promise<PaginatedResponse<ExampleItem>> => {
    const qs = buildPaginationQueryString(params);
    const response = await apiClient.get<PaginatedResponse<ExampleItem>>(
      `/examples?${qs}`,
    );
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<ExampleItem>> => {
    const response = await apiClient.get<ApiResponse<ExampleItem>>(
      `/examples/${encodeURIComponent(id)}`,
    );
    return response.data;
  },
};
