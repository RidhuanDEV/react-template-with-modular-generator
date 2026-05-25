import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className, id, checked, defaultChecked, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          "inline-flex cursor-pointer items-center gap-3",
          className,
        )}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="peer sr-only"
          role="switch"
          checked={checked}
          defaultChecked={defaultChecked}
          {...props}
        />
        <span className="relative h-6 w-10 rounded-full bg-input shadow-inner transition-colors duration-200 after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-background after:shadow-sm after:transition-transform peer-checked:bg-primary peer-checked:after:translate-x-4 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring/30 peer-disabled:cursor-not-allowed peer-disabled:opacity-50" />
        {label && (
          <span className="text-sm font-medium text-foreground">{label}</span>
        )}
      </label>
    );
  },
);

Switch.displayName = "Switch";
