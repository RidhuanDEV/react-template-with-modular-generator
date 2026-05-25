import React, { useEffect } from "react";
import { LogOut, Menu, Moon, Sun } from "lucide-react";
import { useUIStore } from "@/store/ui.store";
import { useAuthStore } from "@/store/auth.store";
import { useLogout } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/Button";

export const Header: React.FC = () => {
  const { theme, toggleTheme, toggleSidebar } = useUIStore();
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogout = (): void => {
    logoutMutation.mutate();
  };

  return (
    <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="size-4" aria-hidden="true" />
          ) : (
            <Sun className="size-4" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">
            {theme === "light" ? "Dark" : "Light"}
          </span>
        </Button>

        {user && (
          <div className="hidden items-center gap-3 border-l pl-4 sm:flex">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <div className="grid leading-tight">
              <span className="text-sm font-semibold text-foreground">
                {user.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {user.permissions.includes("admin") ? "Administrator" : "User"}
              </span>
            </div>
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          loading={logoutMutation.isPending}
        >
          {!logoutMutation.isPending && (
            <LogOut className="size-4" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </span>
        </Button>
      </div>
    </div>
  );
};
