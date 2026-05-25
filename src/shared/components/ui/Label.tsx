import { type LabelHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none text-foreground",
          className,
        )}
        {...props}
      >
        {children}
        {required && <span className="text-destructive"> *</span>}
      </label>
    );
  },
);

Label.displayName = "Label";
