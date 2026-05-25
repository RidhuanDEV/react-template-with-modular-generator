import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

interface CardSectionProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = true,
}) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 ease-out",
        padding && "p-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardSectionProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-1.5 pb-4", className)}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardSectionProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("text-sm text-card-foreground", className)}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardSectionProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex items-center pt-4", className)}>{children}</div>
  );
};
