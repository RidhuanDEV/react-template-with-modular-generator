import type { ReactNode } from "react";
import { clsx } from "clsx";

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
      className={clsx("scroll-area", className)}
      style={{ maxHeight, overflow: "auto" }}
    >
      {children}
    </div>
  );
};
