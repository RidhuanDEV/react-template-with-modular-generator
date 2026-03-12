import { clsx } from "clsx";

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
    <div className={clsx("calendar", className)}>
      <div className="calendar__header">
        <span className="calendar__month-year">
          {displayDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <div className="calendar__grid">
        {DAYS.map((day) => (
          <div key={day} className="calendar__day-header">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${String(i)}`} className="calendar__empty" />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            type="button"
            className={clsx(
              "calendar__day",
              isSelected(day) && "calendar__day--selected",
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
