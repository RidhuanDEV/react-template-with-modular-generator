import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, className, id, ...props }, ref) => {
    return (
      <div className={cn("grid gap-2", className)}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium leading-none text-foreground"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          type="range"
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          {...props}
        />
      </div>
    );
  },
);

Slider.displayName = "Slider";
