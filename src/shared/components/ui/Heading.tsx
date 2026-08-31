import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps {
  title: string;
  description?: string;
  badge?: ReactNode;
  actions?: ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  badge,
  actions,
  className,
  level = 1,
}) => {
  const HeadingTag = `h${level}` as const;

  const headingClasses = {
    1: "text-2xl font-bold tracking-tight text-foreground sm:text-3xl",
    2: "text-xl font-semibold tracking-tight text-foreground sm:text-2xl",
    3: "text-lg font-semibold text-foreground",
    4: "text-base font-semibold text-foreground",
  }[level];

  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="grid gap-1">
        <div className="flex items-center gap-3">
          <HeadingTag className={headingClasses}>{title}</HeadingTag>
          {badge}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
};
