import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api.types";
import type { AuthUser, LoginRequest, LoginResponse } from "../types";

export const authService = {
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      data,
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  me: async (): Promise<ApiResponse<AuthUser>> => {
    const response = await apiClient.get<ApiResponse<AuthUser>>("/auth/me");
    return response.data;
  },

  refreshToken: async (
    refreshToken: string,
  ): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      "/auth/refresh",
      {
        refreshToken,
      },
    );
    return response.data;
  },
};
