import { type ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "btn",
          `btn--${variant}`,
          `btn--${size}`,
          fullWidth && "btn--full",
          loading && "btn--loading",
          className,
        )}
        disabled={disabled ?? loading}
        {...props}
      >
        {loading && <span className="btn__spinner" aria-hidden="true" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
