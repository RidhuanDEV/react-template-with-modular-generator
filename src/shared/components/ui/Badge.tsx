import type { ReactNode } from "react";
import { clsx } from "clsx";

type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  children,
  className,
}) => {
  return (
    <span className={clsx("badge", `badge--${variant}`, className)}>
      {children}
    </span>
  );
};
