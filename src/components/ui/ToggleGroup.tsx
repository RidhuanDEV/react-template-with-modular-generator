import { useState, useCallback } from "react";
import { clsx } from "clsx";

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
    <div className={clsx("toggle-group", className)} role="group">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          className={clsx(
            "toggle-group__item",
            activeValue === item.value && "toggle-group__item--active",
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
