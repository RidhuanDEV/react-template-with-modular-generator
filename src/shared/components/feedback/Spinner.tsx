import React from "react";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
      xl: "size-12",
    },
    variant: {
      default: "text-foreground",
      primary: "text-primary",
      muted: "text-muted-foreground",
      white: "text-white",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

export interface SpinnerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size,
  variant,
  className,
  label,
  ...props
}) => {
  return (
    <div
      role="status"
      className={cn("inline-flex items-center justify-center gap-2", className)}
      {...props}
    >
      <Loader2
        className={cn(spinnerVariants({ size, variant }))}
        aria-hidden="true"
      />
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
      <span className="sr-only">{label || "Loading..."}</span>
    </div>
  );
};
