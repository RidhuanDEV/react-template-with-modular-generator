import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: TooltipPosition;
  className?: string;
}

const positionClass = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
} satisfies Record<TooltipPosition, string>;

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  className,
}) => {
  return (
    <span className={cn("group relative inline-flex", className)}>
      {children}
      <span
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-md transition-all duration-150 group-hover:opacity-100 group-focus-within:opacity-100",
          positionClass[position],
        )}
        role="tooltip"
      >
        {content}
      </span>
    </span>
  );
};
