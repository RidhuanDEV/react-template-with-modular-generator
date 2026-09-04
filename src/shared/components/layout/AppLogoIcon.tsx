import React, { type SVGProps } from "react";
import { cn } from "@/lib/utils";

interface AppLogoIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export const AppLogoIcon: React.FC<AppLogoIconProps> = ({
  className,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-6", className)}
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
};
