import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown, LogOut, Palette, Shield, User } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useLogout } from "@/features/auth/hooks/useAuth";
import { DropdownMenu } from "@/components/ui/DropdownMenu";
import { ROUTES } from "@/config/routes";

interface NavUserProps {
  compact?: boolean;
}

export const NavUser: React.FC<NavUserProps> = ({ compact = false }) => {
  const { t } = useTranslation("common");
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const userInitial = user.name.charAt(0).toUpperCase();

  const menuItems = [
    {
      label: t("profile"),
      icon: <User className="size-4" />,
      onClick: () => void navigate(ROUTES.PROFILE),
    },
    {
      label: t("appearance"),
      icon: <Palette className="size-4" />,
      onClick: () => void navigate(ROUTES.SETTINGS_APPEARANCE),
    },
    {
      label: t("security"),
      icon: <Shield className="size-4" />,
      onClick: () => void navigate(ROUTES.SETTINGS_SECURITY),
    },
    {
      label: logoutMutation.isPending ? t("loggingOut") : t("logout"),
      icon: <LogOut className="size-4 text-destructive" />,
      disabled: logoutMutation.isPending,
      onClick: () => logoutMutation.mutate(),
    },
  ];

  const trigger = (
    <div className="flex items-center gap-2.5 rounded-lg p-1.5 transition-colors hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-xs">
        {userInitial}
      </span>
      {!compact && (
        <div className="grid text-left leading-tight">
          <span className="truncate text-xs font-semibold text-foreground">
            {user.name}
          </span>
          <span className="truncate text-[11px] text-muted-foreground">
            {user.email}
          </span>
        </div>
      )}
      <ChevronDown
        className="size-3.5 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  );

  return <DropdownMenu trigger={trigger} items={menuItems} />;
};
