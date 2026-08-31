import React, { type AnchorHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface TextLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> {
  to?: LinkProps["to"];
  href?: string;
  variant?: "primary" | "muted" | "destructive";
}

export const TextLink: React.FC<TextLinkProps> = ({
  to,
  href,
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const variantClasses = {
    primary: "text-primary hover:text-primary/80 decoration-primary/30",
    muted:
      "text-muted-foreground hover:text-foreground decoration-muted-foreground/30",
    destructive:
      "text-destructive hover:text-destructive/80 decoration-destructive/30",
  }[variant];

  const baseClasses = cn(
    "font-medium underline underline-offset-4 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs",
    variantClasses,
    className,
  );

  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={baseClasses} {...props}>
      {children}
    </a>
  );
};
