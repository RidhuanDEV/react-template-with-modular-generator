import { type InputHTMLAttributes, forwardRef } from "react";
import type { SelectOption } from "@/types/common.types";
import { cn } from "@/lib/utils";

interface RadioGroupProps {
  name: string;
  options: SelectOption[];
  value?: string;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  error?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    { name, options, value, onChange, error, label, className, disabled },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("grid gap-3", className)}
        role="radiogroup"
        aria-label={label}
      >
        {label && (
          <span className="text-sm font-medium leading-none text-foreground">
            {label}
          </span>
        )}
        <div className="grid gap-2">
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-transparent p-1 text-sm transition-colors hover:bg-accent disabled:cursor-not-allowed"
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={onChange}
                disabled={disabled ?? opt.disabled}
                className="size-4 accent-primary"
              />
              <span className="text-foreground">{opt.label}</span>
            </label>
          ))}
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

RadioGroup.displayName = "RadioGroup";
