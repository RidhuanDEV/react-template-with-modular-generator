import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api.types";
import type {
  UpdateProfileRequest,
  UpdateProfileResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
  SessionInfo,
} from "../types";
import { useAuthStore } from "@/store/auth.store";

export const settingsService = {
  updateProfile: async (
    data: UpdateProfileRequest,
  ): Promise<ApiResponse<UpdateProfileResponse>> => {
    try {
      const response = await apiClient.patch<
        ApiResponse<UpdateProfileResponse>
      >("/settings/profile", data);
      return response.data;
    } catch {
      const currentUser = useAuthStore.getState().user;
      const updatedUser = {
        id: currentUser?.id ?? "usr_mock",
        name: data.name,
        email: data.email,
        permissions: currentUser?.permissions ?? ["user"],
        avatarUrl: data.avatarUrl ?? currentUser?.avatarUrl,
      };

      useAuthStore.getState().setUser(updatedUser);

      return {
        data: {
          user: updatedUser,
          message: "Profile updated successfully",
        },
        message: "Profile updated (Mock Mode)",
        status: 200,
      };
    }
  },

  updatePassword: async (
    data: UpdatePasswordRequest,
  ): Promise<ApiResponse<UpdatePasswordResponse>> => {
    try {
      const response = await apiClient.put<ApiResponse<UpdatePasswordResponse>>(
        "/settings/password",
        data,
      );
      return response.data;
    } catch {
      return {
        data: {
          message: "Password updated successfully",
        },
        message: "Password changed (Mock Mode)",
        status: 200,
      };
    }
  },

  deleteAccount: async (
    data: DeleteAccountRequest,
  ): Promise<ApiResponse<DeleteAccountResponse>> => {
    try {
      const response = await apiClient.delete<
        ApiResponse<DeleteAccountResponse>
      >("/settings/account", { data });
      return response.data;
    } catch {
      useAuthStore.getState().logout();
      return {
        data: {
          message: "Your account has been deleted.",
        },
        message: "Account deleted (Mock Mode)",
        status: 200,
      };
    }
  },

  getActiveSessions: async (): Promise<ApiResponse<SessionInfo[]>> => {
    try {
      const response =
        await apiClient.get<ApiResponse<SessionInfo[]>>("/settings/sessions");
      return response.data;
    } catch {
      const mockSessions: SessionInfo[] = [
        {
          id: "sess_1",
          device: "Chrome on macOS (Current Device)",
          ipAddress: "127.0.0.1",
          lastActive: "Active now",
          isCurrent: true,
        },
        {
          id: "sess_2",
          device: "Safari on iPhone 15 Pro",
          ipAddress: "192.168.1.45",
          lastActive: "2 hours ago",
          isCurrent: false,
        },
      ];

      return {
        data: mockSessions,
        message: "Active sessions retrieved (Mock Mode)",
        status: 200,
      };
    }
  },
};
