import { type LabelHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, className, children, ...props }, ref) => {
    return (
      <label ref={ref} className={clsx("form-label", className)} {...props}>
        {children}
        {required && <span className="form-label__required"> *</span>}
      </label>
    );
  },
);

Label.displayName = "Label";
