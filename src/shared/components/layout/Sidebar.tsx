import React, { type ReactElement } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  User,
  Palette,
  Shield,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  type LucideIcon,
} from "lucide-react";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui.store";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "@/components/ui/Toast";
import { AppLogo } from "./AppLogo";
import { AppLogoIcon } from "./AppLogoIcon";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

export const Sidebar: React.FC = (): ReactElement => {
  const { t } = useTranslation("common");
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    toast.info({
      title: t("logout"),
      description: "You have been logged out",
    });
    void navigate(ROUTES.LOGIN);
  };

  const navGroups: NavGroup[] = [
    {
      label: "Platform",
      items: [
        {
          to: ROUTES.DASHBOARD,
          label: t("dashboard"),
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: t("settings"),
      items: [
        {
          to: ROUTES.SETTINGS_PROFILE,
          label: t("profile"),
          icon: User,
        },
        {
          to: ROUTES.SETTINGS_APPEARANCE,
          label: t("appearance"),
          icon: Palette,
        },
        {
          to: ROUTES.SETTINGS_SECURITY,
          label: t("security"),
          icon: Shield,
        },
      ],
    },
  ];

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <aside
      className={cn(
        "flex h-full flex-col justify-between overflow-y-auto bg-sidebar p-3 text-sidebar-foreground transition-all duration-300 ease-in-out select-none",
        sidebarOpen ? "w-64" : "w-full items-center",
      )}
      aria-label="Main sidebar"
    >
      {/* Top Branding & Toggle */}
      <div className="w-full space-y-4">
        {sidebarOpen ? (
          <div className="flex items-center justify-between px-2 py-1">
            <AppLogo to={ROUTES.DASHBOARD} />
            <button
              type="button"
              onClick={toggleSidebar}
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              title={t("toggleSidebar")}
              aria-label={t("toggleSidebar")}
            >
              <PanelLeftClose className="size-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-1">
            <NavLink
              to={ROUTES.DASHBOARD}
              className="flex size-9 cursor-pointer items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20 no-underline transition-opacity hover:opacity-90"
              title={t("dashboard")}
            >
              <AppLogoIcon className="size-5" aria-hidden="true" />
            </NavLink>
            <button
              type="button"
              onClick={toggleSidebar}
              className="inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              title={t("toggleSidebar")}
              aria-label={t("toggleSidebar")}
            >
              <PanelLeftOpen className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="h-px w-full bg-sidebar-border/60" aria-hidden="true" />

        {/* Navigation Groups */}
        <nav className="space-y-4" role="navigation">
          {navGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              {sidebarOpen && (
                <div className="px-2.5 py-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  {group.label}
                </div>
              )}
              <div className="grid gap-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      title={!sidebarOpen ? item.label : undefined}
                      className={({ isActive }) =>
                        cn(
                          "group relative flex cursor-pointer items-center rounded-lg text-sm font-medium no-underline transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          sidebarOpen
                            ? "gap-3 px-3 py-2 text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            : "size-10 justify-center text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive &&
                            cn(
                              "bg-sidebar-accent font-semibold text-sidebar-accent-foreground shadow-2xs ring-1 ring-sidebar-border/60",
                              sidebarOpen && "border-l-2 border-primary",
                            ),
                        )
                      }
                      aria-label={item.label}
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            className={cn(
                              "size-4.5 shrink-0 stroke-[1.8] transition-colors",
                              isActive
                                ? "text-primary"
                                : "text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground",
                            )}
                            aria-hidden="true"
                          />
                          {sidebarOpen && (
                            <span className="truncate">{item.label}</span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer User Info & Logout */}
      <div className="w-full space-y-2 border-t border-sidebar-border/60 pt-3">
        {sidebarOpen ? (
          <div className="flex items-center justify-between gap-2 rounded-xl bg-sidebar-accent/40 p-2">
            <NavLink
              to={ROUTES.SETTINGS_PROFILE}
              className="flex min-w-0 cursor-pointer items-center gap-2.5 no-underline"
              title={t("profile")}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground shadow-2xs">
                {userInitial}
              </span>
              <div className="grid min-w-0 leading-tight">
                <span className="truncate text-xs font-semibold text-foreground">
                  {user?.name ?? "User"}
                </span>
                <span className="truncate text-[10px] text-muted-foreground">
                  {user?.email ?? "Signed In"}
                </span>
              </div>
            </NavLink>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              title={t("logout")}
              aria-label={t("logout")}
            >
              <LogOut className="size-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <NavLink
              to={ROUTES.SETTINGS_PROFILE}
              className="flex size-8 cursor-pointer items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground shadow-2xs no-underline"
              title={user?.name ?? t("profile")}
            >
              {userInitial}
            </NavLink>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              title={t("logout")}
              aria-label={t("logout")}
            >
              <LogOut className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {sidebarOpen && (
          <div className="px-2 text-[10px] tracking-wide text-muted-foreground/80">
            {t("version")}
          </div>
        )}
      </div>
    </aside>
  );
};
