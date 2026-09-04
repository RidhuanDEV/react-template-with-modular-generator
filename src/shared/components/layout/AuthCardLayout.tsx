import React, { type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/store/auth.store";
import { APP_NAME } from "@/config/constants";

interface AuthCardLayoutProps {
  children?: ReactNode;
}

export const AuthCardLayout: React.FC<AuthCardLayoutProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-[radial-gradient(circle_at_top,var(--color-primary)/0.08,transparent_50%),linear-gradient(180deg,var(--color-background),var(--color-muted)/0.3)] p-4 sm:p-6 md:p-10">
      <div className="mb-6 flex items-center gap-2.5">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
          <Sparkles className="size-5" aria-hidden="true" />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">
          {APP_NAME}
        </span>
      </div>
      <div className="w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
        {children || <Outlet />}
      </div>
    </div>
  );
};
