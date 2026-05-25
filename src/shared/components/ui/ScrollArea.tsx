import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
  maxHeight?: string;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  className,
  maxHeight = "400px",
}) => {
  return (
    <div
      className={cn("overflow-auto rounded-md", className)}
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
};
