import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className={cn(
              "size-4 rounded border border-input accent-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive",
              className,
            )}
            aria-invalid={!!error}
            {...props}
          />
          {label && (
            <label
              htmlFor={id}
              className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <span className="text-sm font-medium text-destructive" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
