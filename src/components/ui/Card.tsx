import type { ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = true,
}) => {
  return (
    <div className={clsx("card", padding && "card--padded", className)}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
}) => {
  return <div className={clsx("card__header", className)}>{children}</div>;
};

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
}) => {
  return <div className={clsx("card__content", className)}>{children}</div>;
};

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
}) => {
  return <div className={clsx("card__footer", className)}>{children}</div>;
};
