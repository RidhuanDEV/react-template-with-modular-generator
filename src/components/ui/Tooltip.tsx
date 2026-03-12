import type { ReactNode } from "react";
import { clsx } from "clsx";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  className,
}) => {
  return (
    <div className={clsx("tooltip-wrapper", className)}>
      {children}
      <span className={clsx("tooltip", `tooltip--${position}`)} role="tooltip">
        {content}
      </span>
    </div>
  );
};
