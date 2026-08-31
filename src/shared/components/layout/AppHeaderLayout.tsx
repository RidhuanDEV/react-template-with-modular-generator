import React, { type ReactNode } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BarChart3, Settings } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { NavUser } from "./NavUser";
import { AppLogo } from "./AppLogo";
import { AppearanceTabs } from "@/components/ui/AppearanceTabs";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { cn } from "@/lib/utils";

interface AppHeaderLayoutProps {
  children?: ReactNode;
}

export const AppHeaderLayout: React.FC<AppHeaderLayoutProps> = ({
  children,
}) => {
  const { t } = useTranslation("common");

  const navItems = [
    { to: ROUTES.DASHBOARD, label: t("dashboard"), icon: BarChart3 },
    { to: ROUTES.SETTINGS, label: t("settings"), icon: Settings },
  ];

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <AppLogo to={ROUTES.DASHBOARD} />

            <nav className="hidden items-center gap-1 sm:flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors no-underline",
                        isActive
                          ? "bg-accent text-accent-foreground font-semibold shadow-2xs"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                      )
                    }
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <LanguageSelector />
            <AppearanceTabs className="hidden sm:inline-flex" />
            <div className="h-6 w-px bg-border/60" aria-hidden="true" />
            <NavUser />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 lg:p-8">
        {children || <Outlet />}
      </main>
    </div>
  );
};
