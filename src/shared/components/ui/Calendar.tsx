import { cn } from "@/lib/utils";

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  className,
  minDate,
  maxDate,
}) => {
  const today = new Date();
  const displayDate = value ?? today;
  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const isDisabled = (day: number): boolean => {
    const date = new Date(year, month, day);
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSelected = (day: number): boolean => {
    if (!value) return false;
    return (
      value.getDate() === day &&
      value.getMonth() === month &&
      value.getFullYear() === year
    );
  };

  return (
    <div className={cn("w-72 rounded-md border bg-popover p-3", className)}>
      <div className="mb-3 flex items-center justify-center">
        <span className="text-sm font-medium text-popover-foreground">
          {displayDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {DAYS.map((day) => (
          <div
            key={day}
            className="flex size-8 items-center justify-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${String(i)}`} className="size-8" />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            type="button"
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40",
              isSelected(day) &&
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            )}
            disabled={isDisabled(day)}
            onClick={() => onChange?.(new Date(year, month, day))}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};
