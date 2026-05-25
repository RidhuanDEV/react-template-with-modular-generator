import { type SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import type { SelectOption } from "@/types/common.types";
import { cn } from "@/lib/utils";

interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> {
  options: SelectOption[];
  error?: string;
  label?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, error, label, placeholder, className, id, ...props }, ref) => {
    return (
      <div className="grid gap-2">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium leading-none text-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={cn(
              "flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-9 text-sm shadow-xs transition-colors duration-200 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
              error &&
                "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/25",
              className,
            )}
            aria-invalid={!!error}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
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

Select.displayName = "Select";
