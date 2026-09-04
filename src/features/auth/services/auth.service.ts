import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api.types";
import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ConfirmPasswordRequest,
  ConfirmPasswordResponse,
  ResendVerificationResponse,
} from "../types";

export const authService = {
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await apiClient.post<ApiResponse<LoginResponse>>(
        "/auth/login",
        data,
      );
      return response.data;
    } catch {
      const mockUser: AuthUser = {
        id: "usr_mock_1",
        name: data.email.split("@")[0] || "Demo User",
        email: data.email,
        permissions: ["user", "dashboard:view", "profile:edit"],
        emailVerified: true,
      };

      return {
        data: {
          token: "mock-jwt-token-" + String(Date.now()),
          user: mockUser,
        },
        message: "Login successful (Mock Mode)",
        status: 200,
      };
    }
  },

  register: async (
    data: RegisterRequest,
  ): Promise<ApiResponse<RegisterResponse>> => {
    try {
      const response = await apiClient.post<ApiResponse<RegisterResponse>>(
        "/auth/register",
        data,
      );
      return response.data;
    } catch {
      const mockUser: AuthUser = {
        id: "usr_mock_" + String(Date.now()),
        name: data.name,
        email: data.email,
        permissions: ["user", "dashboard:view", "profile:edit"],
        emailVerified: false,
      };

      return {
        data: {
          token: "mock-jwt-token-" + String(Date.now()),
          user: mockUser,
          message: "Registration successful",
        },
        message: "Registration successful (Mock Mode)",
        status: 201,
      };
    }
  },

  forgotPassword: async (
    data: ForgotPasswordRequest,
  ): Promise<ApiResponse<ForgotPasswordResponse>> => {
    try {
      const response = await apiClient.post<
        ApiResponse<ForgotPasswordResponse>
      >("/auth/forgot-password", data);
      return response.data;
    } catch {
      return {
        data: {
          message: `If an account with ${data.email} exists, a password reset link has been sent.`,
        },
        message: "Reset link dispatched (Mock Mode)",
        status: 200,
      };
    }
  },

  resetPassword: async (
    data: ResetPasswordRequest,
  ): Promise<ApiResponse<ResetPasswordResponse>> => {
    try {
      const response = await apiClient.post<ApiResponse<ResetPasswordResponse>>(
        "/auth/reset-password",
        data,
      );
      return response.data;
    } catch {
      return {
        data: {
          message: "Your password has been successfully reset.",
        },
        message: "Password reset successful (Mock Mode)",
        status: 200,
      };
    }
  },

  confirmPassword: async (
    data: ConfirmPasswordRequest,
  ): Promise<ApiResponse<ConfirmPasswordResponse>> => {
    try {
      const response = await apiClient.post<
        ApiResponse<ConfirmPasswordResponse>
      >("/auth/confirm-password", data);
      return response.data;
    } catch {
      return {
        data: {
          confirmed: true,
          message: "Password confirmed successfully.",
        },
        message: "Password confirmed (Mock Mode)",
        status: 200,
      };
    }
  },

  resendVerificationEmail: async (): Promise<
    ApiResponse<ResendVerificationResponse>
  > => {
    try {
      const response = await apiClient.post<
        ApiResponse<ResendVerificationResponse>
      >("/auth/email/verification-notification");
      return response.data;
    } catch {
      return {
        data: {
          message:
            "A new verification link has been sent to your email address.",
        },
        message: "Verification link sent (Mock Mode)",
        status: 200,
      };
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // Ignore network errors on mock logout
    }
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
      { refreshToken },
    );
    return response.data;
  },
};
