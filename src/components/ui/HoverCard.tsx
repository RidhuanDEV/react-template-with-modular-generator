import type { ReactNode } from "react";
import { clsx } from "clsx";

interface HoverCardProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  trigger,
  children,
  className,
}) => {
  return (
    <div className={clsx("hover-card", className)}>
      <div className="hover-card__trigger">{trigger}</div>
      <div className="hover-card__content">{children}</div>
    </div>
  );
};
