import { useState, useRef, useCallback, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/Calendar";
import { cn } from "@/lib/utils";

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
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        type="button"
        className={cn(
          "inline-flex h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          !value && "text-muted-foreground",
        )}
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {displayValue}
        <CalendarIcon className="size-4" aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute left-0 z-50 mt-2 animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 duration-200">
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
