import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
    <div className={cn("group relative inline-block", className)}>
      <div>{trigger}</div>
      <div className="invisible absolute left-0 z-50 mt-2 w-72 rounded-md border bg-popover p-4 text-sm text-popover-foreground opacity-0 shadow-md transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {children}
      </div>
    </div>
  );
};
