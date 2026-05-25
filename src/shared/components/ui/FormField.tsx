import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
    <div className={cn("grid gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium leading-none text-foreground"
      >
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      {children}
      {description && !error && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && (
        <span className="text-sm font-medium text-destructive" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
