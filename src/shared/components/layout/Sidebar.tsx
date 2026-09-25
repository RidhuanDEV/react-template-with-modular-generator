import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  LogOut,
  Palette,
  PanelLeftClose,
  PanelLeftOpen,
  Shield,
  User,
  type LucideIcon,
} from "lucide-react";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui.store";
import { useAuthStore } from "@/store/auth.store";
import { AppLogo } from "./AppLogo";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

interface NavGroup {
  id: string;
  title: string;
  items: readonly NavItem[];
}

export const Sidebar: React.FC = () => {
  const { t } = useTranslation(["common", "settings"]);
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    void navigate(ROUTES.LOGIN);
  };

  const navGroups: readonly NavGroup[] = [
    {
      id: "platform",
      title: "Platform",
      items: [
        {
          to: ROUTES.DASHBOARD,
          label: t("common:dashboard"),
          icon: LayoutDashboard,
        },
      ],
    },
    {
      id: "settings",
      title: t("common:settings"),
      items: [
        {
          to: ROUTES.SETTINGS_PROFILE,
          label: t("common:profile"),
          icon: User,
        },
        {
          to: ROUTES.SETTINGS_APPEARANCE,
          label: t("common:appearance"),
          icon: Palette,
        },
        {
          to: ROUTES.SETTINGS_SECURITY,
          label: t("common:security"),
          icon: Shield,
        },
      ],
    },
  ];

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between overflow-y-auto transition-all duration-300",
        sidebarOpen ? "w-64 p-4" : "w-full p-2 items-center",
      )}
    >
      <div className="flex w-full flex-col gap-6">
        {/* Header / Logo section */}
        <div
          className={cn(
            "flex items-center",
            sidebarOpen ? "justify-between px-2 py-1" : "justify-center py-2",
          )}
        >
          <AppLogo to={ROUTES.DASHBOARD} showText={sidebarOpen} />
          {sidebarOpen && (
            <button
              type="button"
              onClick={toggleSidebar}
              className="cursor-pointer rounded-md p-1.5 text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Navigation Groups */}
        <nav className="flex w-full flex-col gap-4">
          {navGroups.map((group, groupIdx) => (
            <div key={group.id} className="flex flex-col gap-1">
              {sidebarOpen ? (
                <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                  {group.title}
                </span>
              ) : (
                groupIdx > 0 && (
                  <div className="my-1 w-full border-t border-sidebar-border" />
                )
              )}

              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    title={!sidebarOpen ? item.label : undefined}
                    aria-label={item.label}
                    className={({ isActive }) =>
                      cn(
                        "flex cursor-pointer items-center rounded-lg text-sm font-medium transition-colors no-underline",
                        sidebarOpen
                          ? "gap-3 px-3 py-2 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          : "justify-center p-2.5 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive &&
                          "bg-sidebar-accent font-semibold text-sidebar-accent-foreground shadow-2xs",
                      )
                    }
                  >
                    <Icon className="size-4.5 shrink-0" aria-hidden="true" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer / User & Version section */}
      <div className="w-full border-t border-sidebar-border pt-3">
        {sidebarOpen ? (
          <div className="flex flex-col gap-3">
            {user && (
              <div className="flex items-center justify-between rounded-lg bg-sidebar-accent/40 p-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-xs">
                    {userInitial}
                  </span>
                  <div className="grid min-w-0 text-left leading-tight">
                    <span className="truncate text-xs font-semibold text-foreground">
                      {user.name}
                    </span>
                    <span className="truncate text-[11px] text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  title={t("common:logout")}
                  aria-label={t("common:logout")}
                >
                  <LogOut className="size-4" aria-hidden="true" />
                </button>
              </div>
            )}
            <div className="flex items-center justify-between px-2 text-[11px] text-muted-foreground">
              <span>{t("common:version")}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {user && (
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-xs"
                title={`${user.name} (${user.email})`}
              >
                {userInitial}
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              title={t("common:logout")}
              aria-label={t("common:logout")}
            >
              <LogOut className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={toggleSidebar}
              className="cursor-pointer rounded-md p-2 text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <PanelLeftOpen className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
