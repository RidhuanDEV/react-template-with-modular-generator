import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { ApiError, ApiResponse } from "@/types/api.types";
import { QUERY_KEYS } from "@/config/constants";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/config/routes";
import type { LoginResponse } from "../types";
import type { LoginFormData } from "../schemas";
import { authService } from "../services";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<LoginResponse>, ApiError, LoginFormData>({
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: (response) => {
      const { token, user } = response.data;
      setAuth(token, user);
      queryClient.setQueryData(QUERY_KEYS.AUTH.ME, user);
      void navigate(ROUTES.DASHBOARD);
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, void>({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      logout();
      queryClient.clear();
      void navigate(ROUTES.LOGIN);
    },
  });
};
