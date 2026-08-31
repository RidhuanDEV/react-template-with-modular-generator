import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { ApiError, ApiResponse } from "@/types/api.types";
import { QUERY_KEYS } from "@/config/constants";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/config/routes";
import type {
  UpdateProfileResponse,
  UpdatePasswordResponse,
  DeleteAccountResponse,
  SessionInfo,
} from "../types";
import type {
  UpdateProfileFormData,
  UpdatePasswordFormData,
  DeleteAccountFormData,
} from "../schemas";
import { settingsService } from "../services";
import { toast } from "@/components/ui/Toast";

export const SETTINGS_QUERY_KEYS = {
  SESSIONS: ["settings", "sessions"],
} as const;

export const useUpdateProfile = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<UpdateProfileResponse>,
    ApiError,
    UpdateProfileFormData
  >({
    mutationFn: (data: UpdateProfileFormData) =>
      settingsService.updateProfile(data),
    onSuccess: (response) => {
      setUser(response.data.user);
      queryClient.setQueryData(QUERY_KEYS.AUTH.ME, response.data.user);
      toast.success({
        title: "Profile saved",
        description: response.data.message,
      });
    },
    onError: (error) => {
      toast.error({
        title: "Update failed",
        description: error.message || "Could not update profile",
      });
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation<
    ApiResponse<UpdatePasswordResponse>,
    ApiError,
    UpdatePasswordFormData
  >({
    mutationFn: (data: UpdatePasswordFormData) =>
      settingsService.updatePassword(data),
    onSuccess: (response) => {
      toast.success({
        title: "Password updated",
        description: response.data.message,
      });
    },
    onError: (error) => {
      toast.error({
        title: "Update failed",
        description: error.message || "Could not update password",
      });
    },
  });
};

export const useDeleteAccount = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<DeleteAccountResponse>,
    ApiError,
    DeleteAccountFormData
  >({
    mutationFn: (data: DeleteAccountFormData) =>
      settingsService.deleteAccount(data),
    onSuccess: (response) => {
      logout();
      queryClient.clear();
      toast.success({
        title: "Account deleted",
        description: response.data.message,
      });
      void navigate(ROUTES.LOGIN);
    },
    onError: (error) => {
      toast.error({
        title: "Action failed",
        description: error.message || "Could not delete account",
      });
    },
  });
};

export const useActiveSessions = () => {
  return useQuery<ApiResponse<SessionInfo[]>, ApiError>({
    queryKey: SETTINGS_QUERY_KEYS.SESSIONS,
    queryFn: () => settingsService.getActiveSessions(),
  });
};
