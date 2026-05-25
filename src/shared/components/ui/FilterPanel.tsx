import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FilterOption {
  key: string;
  label: string;
  render: () => ReactNode;
}

interface FilterPanelProps {
  filters: FilterOption[];
  onApply: () => void;
  onReset: () => void;
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onApply,
  onReset,
  className,
}) => {
  return (
    <div className={cn("rounded-lg border bg-card p-4 shadow-sm", className)}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filters.map((filter) => (
          <div key={filter.key} className="grid gap-2">
            <label className="text-sm font-medium text-foreground">
              {filter.label}
            </label>
            {filter.render()}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <Button variant="outline" onClick={onReset} size="sm">
          Reset
        </Button>
        <Button variant="primary" onClick={onApply} size="sm">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
