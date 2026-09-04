import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Palette, Shield, User } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

export const SettingsLayout: React.FC = () => {
  const { t } = useTranslation(["settings", "common"]);

  const settingsTabs = [
    { to: ROUTES.SETTINGS_PROFILE, label: t("common:profile"), icon: User },
    {
      to: ROUTES.SETTINGS_APPEARANCE,
      label: t("common:appearance"),
      icon: Palette,
    },
    { to: ROUTES.SETTINGS_SECURITY, label: t("common:security"), icon: Shield },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Heading
        title={t("settings:settingsTitle")}
        description={t("settings:settingsSubtitle")}
      />

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-x-visible">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors no-underline",
                    isActive
                      ? "bg-accent font-semibold text-accent-foreground shadow-2xs"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                  )
                }
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                <span>{tab.label}</span>
              </NavLink>
            );
          })}
        </aside>

        <div className="space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
