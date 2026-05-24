import { type InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import type { SelectOption } from "@/types/common.types";

interface RadioGroupProps {
  name: string;
  options: SelectOption[];
  value?: string;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  error?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    { name, options, value, onChange, error, label, className, disabled },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx("form-field", className)}
        role="radiogroup"
        aria-label={label}
      >
        {label && <span className="form-label">{label}</span>}
        <div className="radio-group">
          {options.map((opt) => (
            <label key={opt.value} className="radio-option">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={onChange}
                disabled={disabled ?? opt.disabled}
                className="form-radio"
              />
              <span className="radio-label">{opt.label}</span>
            </label>
          ))}
        </div>
        {error && (
          <span className="form-error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

RadioGroup.displayName = "RadioGroup";
