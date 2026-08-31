import React from "react";
import type { AuthUser } from "@/types/auth.types";
import { cn } from "@/lib/utils";

interface UserInfoProps {
  user: AuthUser;
  showEmail?: boolean;
  className?: string;
  avatarClassName?: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  user,
  showEmail = true,
  className,
  avatarClassName,
}) => {
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-xs",
          avatarClassName,
        )}
      >
        {initial}
      </span>
      <div className="grid min-w-0 text-left leading-tight">
        <span className="truncate text-sm font-semibold text-foreground">
          {user.name}
        </span>
        {showEmail && (
          <span className="truncate text-xs text-muted-foreground">
            {user.email}
          </span>
        )}
      </div>
    </div>
  );
};
