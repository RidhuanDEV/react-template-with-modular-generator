import React from "react";
import { NavLink } from "react-router-dom";
import { BarChart3, Sparkles } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

export const Sidebar: React.FC = () => {
  const links = [{ to: ROUTES.HOME, label: "Dashboard", icon: BarChart3 }];

  return (
    <div className="flex h-full w-64 flex-col gap-6 overflow-y-auto p-4">
      <div className="flex items-center gap-3 rounded-lg px-2 py-1.5">
        <span className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
          <Sparkles className="size-5" aria-hidden="true" />
        </span>
        <span className="text-base font-semibold text-sidebar-foreground">
          SSO Portal
        </span>
      </div>
      <nav className="grid gap-1">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 no-underline transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive &&
                    "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm",
                )
              }
            >
              <Icon className="size-4" aria-hidden="true" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
