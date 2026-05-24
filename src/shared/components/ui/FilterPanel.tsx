import type { ReactNode } from "react";
import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";

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
    <div className={clsx("filter-panel", className)}>
      <div className="filter-panel__filters">
        {filters.map((filter) => (
          <div key={filter.key} className="filter-panel__item">
            <label className="form-label">{filter.label}</label>
            {filter.render()}
          </div>
        ))}
      </div>
      <div className="filter-panel__actions">
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
