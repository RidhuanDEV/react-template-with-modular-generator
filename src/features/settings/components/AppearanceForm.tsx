import React from "react";
import { useTranslation } from "react-i18next";
import { Laptop, Moon, Sun, Check } from "lucide-react";
import { useUIStore, type ThemeMode } from "@/store/ui.store";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export const AppearanceForm: React.FC = () => {
  const { t } = useTranslation(["settings", "common"]);
  const { theme, setTheme } = useUIStore();

  const themeOptions = [
    {
      value: "light" as ThemeMode,
      title: t("settings:lightMode"),
      description: t("settings:lightModeDesc"),
      icon: Sun,
    },
    {
      value: "dark" as ThemeMode,
      title: t("settings:darkMode"),
      description: t("settings:darkModeDesc"),
      icon: Moon,
    },
    {
      value: "system" as ThemeMode,
      title: t("settings:systemPref"),
      description: t("settings:systemPrefDesc"),
      icon: Laptop,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="grid gap-1">
          <h2 className="text-lg font-semibold text-foreground">
            {t("settings:appearanceSettings")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("settings:appearanceSettingsDesc")}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-3">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = theme === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTheme(option.value)}
                className={cn(
                  "relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary"
                    : "border-border/60 hover:border-border hover:bg-muted/30",
                )}
                aria-pressed={isSelected}
              >
                <div className="flex w-full items-center justify-between">
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg shadow-2xs",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  {isSelected && (
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xs">
                      <Check className="size-3 stroke-[3]" aria-hidden="true" />
                    </span>
                  )}
                </div>

                <div className="grid gap-1">
                  <span className="text-sm font-semibold text-foreground">
                    {option.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
