import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BarChart3, Settings } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { AppLogo } from "./AppLogo";

export const Sidebar: React.FC = () => {
  const { t } = useTranslation("common");

  const navItems = [
    { to: ROUTES.DASHBOARD, label: t("dashboard"), icon: BarChart3 },
    { to: ROUTES.SETTINGS, label: t("settings"), icon: Settings },
  ];

  return (
    <div className="flex h-full w-64 flex-col justify-between overflow-y-auto p-4">
      <div className="space-y-6">
        <div className="px-2 py-1.5">
          <AppLogo to={ROUTES.DASHBOARD} />
        </div>

        <nav className="grid gap-1">
          {navItems.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 no-underline transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive &&
                      "bg-sidebar-accent font-semibold text-sidebar-accent-foreground shadow-xs",
                  )
                }
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-sidebar-border pt-4">
        <div className="px-2 text-xs text-muted-foreground">{t("version")}</div>
      </div>
    </div>
  );
};
