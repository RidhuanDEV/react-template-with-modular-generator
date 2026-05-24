import { type InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className, id, ...props }, ref) => {
    return (
      <label htmlFor={id} className={clsx("switch", className)}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="switch__input"
          role="switch"
          {...props}
        />
        <span className="switch__slider" />
        {label && <span className="switch__label">{label}</span>}
      </label>
    );
  },
);

Switch.displayName = "Switch";
