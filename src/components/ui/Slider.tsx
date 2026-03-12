import { type InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface SliderProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, className, id, ...props }, ref) => {
    return (
      <div className={clsx("slider-wrapper", className)}>
        {label && (
          <label htmlFor={id} className="form-label">
            {label}
          </label>
        )}
        <input ref={ref} id={id} type="range" className="slider" {...props} />
      </div>
    );
  },
);

Slider.displayName = "Slider";
