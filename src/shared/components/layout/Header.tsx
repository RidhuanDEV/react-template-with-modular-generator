import React, { useEffect } from "react";
import { useUIStore } from "@/store/ui.store";
import { useAuthStore } from "@/store/auth.store";
import { useLogout } from "@/features/auth/hooks/useAuth";

export const Header: React.FC = () => {
  const { theme, toggleTheme, toggleSidebar } = useUIStore();
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();

  // Dynamically update document data-theme for css styles
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogout = (): void => {
    logoutMutation.mutate();
  };

  return (
    <div className="layout-header">
      <div className="layout-header__left">
        <button
          type="button"
          className="layout-header__toggle"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
      </div>

      <div className="layout-header__right">
        <button
          type="button"
          className="layout-header__theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        {user && (
          <div className="layout-header__user">
            <span className="layout-header__user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <div className="layout-header__user-info">
              <span className="layout-header__user-name">{user.name}</span>
              <span className="layout-header__user-role">
                {user.permissions.includes("admin") ? "Administrator" : "User"}
              </span>
            </div>
          </div>
        )}

        <button
          type="button"
          className="layout-header__logout"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
};
