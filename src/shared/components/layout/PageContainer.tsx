import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
  const maxWidthClass = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "max-w-none",
  } satisfies Record<NonNullable<PageContainerProps["maxWidth"]>, string>;

  return (
    <div
      className={cn(
        "mx-auto grid w-full gap-6",
        maxWidthClass[maxWidth],
        className,
      )}
    >
      {children}
    </div>
  );
};
