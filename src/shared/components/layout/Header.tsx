import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";
import { useUIStore } from "@/store/ui.store";
import { Button } from "@/components/ui/Button";
import { NavUser } from "./NavUser";
import { AppearanceTabs } from "@/components/ui/AppearanceTabs";
import { LanguageSelector } from "@/components/ui/LanguageSelector";

interface HeaderProps {
  showSidebarToggle?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ showSidebarToggle = true }) => {
  const { t } = useTranslation("common");
  const { theme, toggleSidebar } = useUIStore();

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent): void => {
        document.documentElement.classList.toggle("dark", e.matches);
        document.documentElement.setAttribute(
          "data-theme",
          e.matches ? "dark" : "light",
        );
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  return (
    <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
      <div className="flex items-center gap-3">
        {showSidebarToggle && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            aria-label={t("toggleSidebar")}
          >
            <Menu className="size-4" aria-hidden="true" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2.5 md:gap-3">
        <LanguageSelector />
        <AppearanceTabs className="hidden sm:inline-flex" />
        <div className="h-6 w-px bg-border/60" aria-hidden="true" />
        <NavUser />
      </div>
    </div>
  );
};
