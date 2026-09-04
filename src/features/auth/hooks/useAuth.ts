import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { ApiError, ApiResponse } from "@/types/api.types";
import { QUERY_KEYS } from "@/config/constants";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/config/routes";
import type {
  LoginResponse,
  RegisterResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  ConfirmPasswordResponse,
  ResendVerificationResponse,
} from "../types";
import type {
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  ConfirmPasswordFormData,
} from "../schemas";
import { authService } from "../services";
import { toast } from "@/components/ui/Toast";

export const useLogin = () => {
  const { t } = useTranslation(["auth", "common"]);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<LoginResponse>, ApiError, LoginFormData>({
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: (response) => {
      const { token, user } = response.data;
      setAuth(token, user);
      queryClient.setQueryData(QUERY_KEYS.AUTH.ME, user);
      toast.success({
        title: t("auth:welcomeBack"),
        description: `${user.name}`,
      });
      void navigate(ROUTES.DASHBOARD);
    },
    onError: (error) => {
      toast.error({
        title: t("auth:loginFailed"),
        description: error.message || t("common:errors.somethingWentWrong"),
      });
    },
  });
};

export const useRegister = () => {
  const { t } = useTranslation(["auth", "common"]);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<RegisterResponse>, ApiError, RegisterFormData>(
    {
      mutationFn: (data: RegisterFormData) =>
        authService.register({
          name: data.name,
          email: data.email,
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
        }),
      onSuccess: (response) => {
        const { token, user } = response.data;
        setAuth(token, user);
        queryClient.setQueryData(QUERY_KEYS.AUTH.ME, user);
        toast.success({
          title: t("auth:createAccountTitle"),
          description: `${user.name}`,
        });
        void navigate(ROUTES.DASHBOARD);
      },
      onError: (error) => {
        toast.error({
          title: t("auth:registrationFailed"),
          description: error.message || t("common:errors.somethingWentWrong"),
        });
      },
    },
  );
};

export const useForgotPassword = () => {
  const { t } = useTranslation(["auth", "common"]);

  return useMutation<
    ApiResponse<ForgotPasswordResponse>,
    ApiError,
    ForgotPasswordFormData
  >({
    mutationFn: (data: ForgotPasswordFormData) =>
      authService.forgotPassword(data),
    onSuccess: (response) => {
      toast.success({
        title: t("auth:forgotPasswordTitle"),
        description: response.data.message,
      });
    },
    onError: (error) => {
      toast.error({
        title: t("common:errors.somethingWentWrong"),
        description: error.message || t("common:errors.somethingWentWrong"),
      });
    },
  });
};

export const useResetPassword = () => {
  const { t } = useTranslation(["auth", "common"]);
  const navigate = useNavigate();

  return useMutation<
    ApiResponse<ResetPasswordResponse>,
    ApiError,
    ResetPasswordFormData
  >({
    mutationFn: (data: ResetPasswordFormData) =>
      authService.resetPassword(data),
    onSuccess: (response) => {
      toast.success({
        title: t("auth:resetPasswordTitle"),
        description: response.data.message,
      });
      void navigate(ROUTES.LOGIN);
    },
    onError: (error) => {
      toast.error({
        title: t("common:errors.somethingWentWrong"),
        description: error.message || t("common:errors.somethingWentWrong"),
      });
    },
  });
};

export const useConfirmPassword = () => {
  const { t } = useTranslation(["auth", "common"]);

  return useMutation<
    ApiResponse<ConfirmPasswordResponse>,
    ApiError,
    ConfirmPasswordFormData
  >({
    mutationFn: (data: ConfirmPasswordFormData) =>
      authService.confirmPassword(data),
    onSuccess: (response) => {
      toast.success({
        title: t("auth:confirmPasswordTitle"),
        description: response.data.message,
      });
    },
    onError: (error) => {
      toast.error({
        title: t("common:errors.somethingWentWrong"),
        description: error.message || t("common:errors.somethingWentWrong"),
      });
    },
  });
};

export const useResendVerificationEmail = () => {
  const { t } = useTranslation(["auth", "common"]);

  return useMutation<ApiResponse<ResendVerificationResponse>, ApiError, void>({
    mutationFn: () => authService.resendVerificationEmail(),
    onSuccess: (response) => {
      toast.success({
        title: t("auth:verifyEmailTitle"),
        description: response.data.message,
      });
    },
    onError: (error) => {
      toast.error({
        title: t("common:errors.somethingWentWrong"),
        description: error.message || t("common:errors.somethingWentWrong"),
      });
    },
  });
};

export const useLogout = () => {
  const { t } = useTranslation("common");
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, void>({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      logout();
      queryClient.clear();
      toast.info({
        title: t("logout"),
        description: "You have been safely logged out",
      });
      void navigate(ROUTES.LOGIN);
    },
  });
};
