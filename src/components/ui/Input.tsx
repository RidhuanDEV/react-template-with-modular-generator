import { type InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, className, id, ...props }, ref) => {
    return (
      <div className="form-field">
        {label && (
          <label htmlFor={id} className="form-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={clsx(
            "form-input",
            error && "form-input--error",
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {error && (
          <span id={`${id}-error`} className="form-error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
