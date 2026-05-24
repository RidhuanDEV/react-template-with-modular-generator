import type { ReactNode } from "react";
import { clsx } from "clsx";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  maxWidth = "xl",
}) => {
  return (
    <div
      className={clsx(
        "page-container",
        `page-container--${maxWidth}`,
        className,
      )}
    >
      {children}
    </div>
  );
};
