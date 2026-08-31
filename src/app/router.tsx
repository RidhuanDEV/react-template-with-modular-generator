import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthSplitLayout } from "@/components/layout/AuthSplitLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ROUTES } from "@/config/routes";

// Public Landing Page (Lazy Loaded)
const WelcomePage = lazy(() => import("@/app/pages/WelcomePage"));

// Auth Pages (Lazy Loaded)
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const ForgotPasswordPage = lazy(
  () => import("@/features/auth/pages/ForgotPasswordPage"),
);
const ResetPasswordPage = lazy(
  () => import("@/features/auth/pages/ResetPasswordPage"),
);
const VerifyEmailPage = lazy(
  () => import("@/features/auth/pages/VerifyEmailPage"),
);
const ConfirmPasswordPage = lazy(
  () => import("@/features/auth/pages/ConfirmPasswordPage"),
);

// Settings Pages (Lazy Loaded)
const SettingsLayout = lazy(
  () => import("@/features/settings/layouts/SettingsLayout"),
);
const ProfilePage = lazy(() => import("@/features/settings/pages/ProfilePage"));
const AppearancePage = lazy(
  () => import("@/features/settings/pages/AppearancePage"),
);
const SecurityPage = lazy(
  () => import("@/features/settings/pages/SecurityPage"),
);

// App Pages (Lazy Loaded)
const DashboardPage = lazy(() => import("@/app/pages/DashboardPage"));
const UnauthorizedPage = lazy(() => import("@/app/pages/UnauthorizedPage"));
const NotFoundPage = lazy(() => import("@/app/pages/NotFoundPage"));

export const router = createBrowserRouter([
  // Public Landing Page
  {
    path: ROUTES.HOME,
    element: <WelcomePage />,
  },

  // Public & Guest Auth Routes
  {
    element: <AuthSplitLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.REGISTER,
        element: <RegisterPage />,
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      {
        path: ROUTES.RESET_PASSWORD,
        element: <ResetPasswordPage />,
      },
      {
        path: ROUTES.VERIFY_EMAIL,
        element: <VerifyEmailPage />,
      },
      {
        path: ROUTES.CONFIRM_PASSWORD,
        element: <ConfirmPasswordPage />,
      },
    ],
  },

  // Protected App Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: <DashboardPage />,
          },
          // Settings Sub-Routes
          {
            path: ROUTES.SETTINGS,
            element: <SettingsLayout />,
            children: [
              {
                index: true,
                element: <Navigate to={ROUTES.SETTINGS_PROFILE} replace />,
              },
              {
                path: "profile",
                element: <ProfilePage />,
              },
              {
                path: "appearance",
                element: <AppearancePage />,
              },
              {
                path: "security",
                element: <SecurityPage />,
              },
            ],
          },
          {
            path: ROUTES.UNAUTHORIZED,
            element: <UnauthorizedPage />,
          },
        ],
      },
    ],
  },

  // Fallback 404 Route
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);
