import React, { type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/store/auth.store";

interface AuthSimpleLayoutProps {
  children?: ReactNode;
}

export const AuthSimpleLayout: React.FC<AuthSimpleLayoutProps> = ({
  children,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm">{children || <Outlet />}</div>
    </div>
  );
};
