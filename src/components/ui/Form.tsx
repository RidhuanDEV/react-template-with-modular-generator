import type { ReactNode } from "react";
import { clsx } from "clsx";

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  children,
  className,
}) => {
  return (
    <form onSubmit={onSubmit} className={clsx("form", className)} noValidate>
      {children}
    </form>
  );
};

interface FormFieldWrapperProps {
  label?: string;
  error?: string;
  description?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  htmlFor?: string;
}

export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
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
      {label && (
        <label htmlFor={htmlFor} className="form-label">
          {label}
          {required && <span className="form-label__required"> *</span>}
        </label>
      )}
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
