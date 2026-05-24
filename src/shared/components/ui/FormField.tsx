import type { ReactNode } from "react";
import { clsx } from "clsx";

interface FormFieldProps {
  label: string;
  error?: string;
  description?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  htmlFor?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  description,
  required,
  children,
  className,
  htmlFor,
}) => {
  return (
    <div
      className={clsx("form-field", error && "form-field--error", className)}
    >
      <label htmlFor={htmlFor} className="form-label">
        {label}
        {required && <span className="form-label__required"> *</span>}
      </label>
      {children}
      {description && !error && (
        <p className="form-description">{description}</p>
      )}
      {error && (
        <span className="form-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
