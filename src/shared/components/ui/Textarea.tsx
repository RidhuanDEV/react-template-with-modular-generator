import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, label, className, id, ...props }, ref) => {
    const errorId = id && error ? `${id}-error` : undefined;

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
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-colors duration-200 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
            error &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/25",
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={errorId}
          {...props}
        />
        {error && (
          <span
            id={errorId}
            className="text-sm font-medium text-destructive"
            role="alert"
          >
            {error}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
