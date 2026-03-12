import { apiClient } from "@/lib/apiClient";
import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from "@/types/api.types";
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from "../types/user.types";
import { buildPaginationQueryString } from "@/utils/pagination";

export const userService = {
  list: async (params: PaginationParams): Promise<PaginatedResponse<User>> => {
    const qs = buildPaginationQueryString(params);
    const response = await apiClient.get<PaginatedResponse<User>>(
      `/users?${qs}`,
    );
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<User>> => {
    const response = await apiClient.get<ApiResponse<User>>(
      `/users/${encodeURIComponent(id)}`,
    );
    return response.data;
  },

  create: async (data: CreateUserRequest): Promise<ApiResponse<User>> => {
    const response = await apiClient.post<ApiResponse<User>>("/users", data);
    return response.data;
  },

  update: async (
    id: string,
    data: UpdateUserRequest,
  ): Promise<ApiResponse<User>> => {
    const response = await apiClient.put<ApiResponse<User>>(
      `/users/${encodeURIComponent(id)}`,
      data,
    );
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${encodeURIComponent(id)}`);
  },
};
