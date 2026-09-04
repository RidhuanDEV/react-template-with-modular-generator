import React, { type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Sparkles, Quote } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/store/auth.store";
import { APP_NAME } from "@/config/constants";

interface AuthSplitLayoutProps {
  children?: ReactNode;
  quoteText?: string;
  quoteAuthor?: string;
  quoteRole?: string;
}

export const AuthSplitLayout: React.FC<AuthSplitLayoutProps> = ({
  children,
  quoteText = "This template provides the highest level of architecture, type-safety, and modularity for modern enterprise applications.",
  quoteAuthor = "Frontend Engineering Lead",
  quoteRole = "Core Architecture Team",
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col justify-between p-6 md:p-10">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
            <Sparkles className="size-5" aria-hidden="true" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            {APP_NAME}
          </span>
        </div>

        <div className="mx-auto my-auto w-full max-w-md py-8">
          {children || <Outlet />}
        </div>

        <div className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </div>

      <div className="relative hidden flex-col justify-between overflow-hidden bg-zinc-950 p-10 text-white lg:flex dark:border-l dark:border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.55_0.22_262.88/0.35),transparent_50%),radial-gradient(circle_at_bottom_left,oklch(0.6_0.18_190/0.25),transparent_50%)]" />
        <div className="relative z-10 flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-zinc-400">
          Enterprise Standard
        </div>
        <div className="relative z-10 max-w-lg space-y-4">
          <Quote
            className="size-8 text-primary/80 opacity-70"
            aria-hidden="true"
          />
          <blockquote className="text-xl font-medium leading-relaxed text-zinc-200">
            "{quoteText}"
          </blockquote>
          <div className="space-y-0.5">
            <div className="text-sm font-semibold text-white">
              {quoteAuthor}
            </div>
            <div className="text-xs text-zinc-400">{quoteRole}</div>
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-6 text-xs text-zinc-500">
          <span>React 19</span>
          <span>TypeScript Strict</span>
          <span>Zod & TanStack</span>
        </div>
      </div>
    </div>
  );
};
