import { type InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

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
      <div className="form-field form-field--checkbox">
        <div className="checkbox-wrapper">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className={clsx("form-checkbox", className)}
            aria-invalid={!!error}
            {...props}
          />
          {label && (
            <label htmlFor={id} className="form-checkbox-label">
              {label}
            </label>
          )}
        </div>
        {error && (
          <span className="form-error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
