import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config/constants";
import type {
  ApiError,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from "@/types/api.types";
import { exampleService } from "../services/example.service";
import type { ExampleItem } from "../types/example.types";

export const useExamples = (params: PaginationParams) => {
  return useQuery<PaginatedResponse<ExampleItem>, ApiError>({
    queryKey: [...QUERY_KEYS.EXAMPLES.LIST, params],
    queryFn: () => exampleService.list(params),
  });
};

export const useExample = (id: string) => {
  return useQuery<ApiResponse<ExampleItem>, ApiError>({
    queryKey: QUERY_KEYS.EXAMPLES.DETAIL(id),
    queryFn: () => exampleService.getById(id),
    enabled: !!id,
  });
};
