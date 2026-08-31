import React from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { useUIStore, type ThemeMode } from "@/store/ui.store";
import { cn } from "@/lib/utils";

interface AppearanceTabsProps {
  className?: string;
}

interface TabOption {
  value: ThemeMode;
  label: string;
  icon: typeof Sun;
}

const TAB_OPTIONS: readonly TabOption[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
];

export const AppearanceTabs: React.FC<AppearanceTabsProps> = ({
  className,
}) => {
  const { theme, setTheme } = useUIStore();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border border-input bg-muted/50 p-1 shadow-2xs",
        className,
      )}
      role="group"
      aria-label="Theme selector"
    >
      {TAB_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isSelected = theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isSelected
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
            )}
            aria-pressed={isSelected}
          >
            <Icon className="size-4" aria-hidden="true" />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};
