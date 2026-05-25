import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-input bg-background shadow-xs hover:bg-accent",
      },
      pressed: {
        true: "bg-accent text-accent-foreground",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      pressed: false,
    },
  },
);

interface ToggleProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      pressed = false,
      onPressedChange,
      variant = "default",
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={pressed}
        className={cn(toggleVariants({ variant, pressed }), className)}
        onClick={(event) => {
          onClick?.(event);
          onPressedChange?.(!pressed);
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Toggle.displayName = "Toggle";
