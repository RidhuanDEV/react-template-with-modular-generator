import React from "react";
import { cn } from "@/lib/utils";

export interface {{pascalCase}}Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const {{pascalCase}}: React.FC<{{pascalCase}}Props> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("rounded-lg border bg-card p-4 text-card-foreground shadow-xs", className)} {...props}>
      {children || <p className="text-sm font-medium">{{pascalCase}} Component</p>}
    </div>
  );
};