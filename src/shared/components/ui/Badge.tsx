import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "border-transparent bg-secondary text-secondary-foreground",
        primary: "border-transparent bg-primary text-primary-foreground",
        success:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
        warning:
          "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
        danger: "border-transparent bg-destructive text-destructive-foreground",
        info: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  children,
  className,
}) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {children}
    </span>
  );
};
