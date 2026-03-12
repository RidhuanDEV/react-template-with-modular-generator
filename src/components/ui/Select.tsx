import { type SelectHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import type { SelectOption } from "@/types/common.types";

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
      <div className="form-field">
        {label && (
          <label htmlFor={id} className="form-label">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={clsx(
            "form-select",
            error && "form-select--error",
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
        {error && (
          <span className="form-error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
