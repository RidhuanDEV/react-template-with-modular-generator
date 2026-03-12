import { useState, useRef, useCallback, useEffect } from "react";
import { clsx } from "clsx";
import { Calendar } from "@/components/ui/Calendar";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Select date",
  className,
  minDate,
  maxDate,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        e.target instanceof Node &&
        !ref.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (date: Date) => {
      onChange?.(date);
      setOpen(false);
    },
    [onChange],
  );

  const displayValue = value
    ? value.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : placeholder;

  return (
    <div ref={ref} className={clsx("date-picker", className)}>
      <button
        type="button"
        className="date-picker__trigger"
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {displayValue}
      </button>
      {open && (
        <div className="date-picker__dropdown">
          <Calendar
            value={value}
            onChange={handleSelect}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
};
