import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ToggleGroupItem {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ToggleGroupProps {
  items: ToggleGroupItem[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  items,
  value: controlledValue,
  onChange,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(controlledValue ?? "");
  const activeValue = controlledValue ?? internalValue;

  const handleChange = useCallback(
    (val: string) => {
      setInternalValue(val);
      onChange?.(val);
    },
    [onChange],
  );

  return (
    <div
      className={cn(
        "inline-flex rounded-md border bg-background p-1",
        className,
      )}
      role="group"
    >
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          className={cn(
            "inline-flex h-8 items-center justify-center rounded-sm px-3 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            activeValue === item.value &&
              "bg-primary text-primary-foreground shadow-sm",
          )}
          disabled={item.disabled}
          onClick={() => handleChange(item.value)}
          aria-pressed={activeValue === item.value}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
