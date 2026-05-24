import { type ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

type ToggleVariant = "default" | "outline";

interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: ToggleVariant;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      pressed = false,
      onPressedChange,
      variant = "default",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={pressed}
        className={clsx(
          "toggle",
          `toggle--${variant}`,
          pressed && "toggle--pressed",
          className,
        )}
        onClick={() => onPressedChange?.(!pressed)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Toggle.displayName = "Toggle";
