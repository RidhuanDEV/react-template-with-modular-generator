import React from "react";
import { Link } from "react-router-dom";
import { AppLogoIcon } from "./AppLogoIcon";
import { APP_NAME } from "@/config/constants";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

interface AppLogoProps {
  className?: string;
  showText?: boolean;
  to?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  className,
  showText = true,
  to = ROUTES.HOME,
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2.5 no-underline transition-opacity hover:opacity-90",
        className,
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
        <AppLogoIcon className="size-5" aria-hidden="true" />
      </span>
      {showText && (
        <span className="text-base font-bold tracking-tight text-foreground">
          {APP_NAME}
        </span>
      )}
    </Link>
  );
};
