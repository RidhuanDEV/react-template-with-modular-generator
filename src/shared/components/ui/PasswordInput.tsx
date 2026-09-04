import { type InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  error?: string;
  label?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error, label, className, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const errorId = id && error ? `${id}-error` : undefined;

    const toggleVisibility = (): void => {
      setShowPassword((prev) => !prev);
    };

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
        <div className="relative flex items-center">
          <input
            ref={ref}
            id={id}
            type={showPassword ? "text" : "password"}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm shadow-xs transition-colors duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
              error &&
                "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/25",
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={errorId}
            {...props}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-2.5 flex size-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
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

PasswordInput.displayName = "PasswordInput";
