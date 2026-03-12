import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ROUTES } from "@/config/routes";

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const UserListPage = lazy(() => import("@/features/user/pages/UserListPage"));
const ExampleListPage = lazy(
  () => import("@/features/example/pages/ExampleListPage"),
);

const DashboardPage = lazy(() => import("@/app/pages/DashboardPage"));
const UnauthorizedPage = lazy(() => import("@/app/pages/UnauthorizedPage"));
const NotFoundPage = lazy(() => import("@/app/pages/NotFoundPage"));

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.HOME,
            element: <DashboardPage />,
          },
          {
            path: ROUTES.DASHBOARD,
            element: <DashboardPage />,
          },
          {
            path: ROUTES.USERS,
            element: <UserListPage />,
          },
          {
            path: ROUTES.EXAMPLES,
            element: <ExampleListPage />,
          },
          {
            path: ROUTES.UNAUTHORIZED,
            element: <UnauthorizedPage />,
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);
