import { type InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface SearchInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, className, value, ...props }, ref) => {
    return (
      <div className={clsx("search-input", className)}>
        <span className="search-input__icon" aria-hidden="true">
          &#128269;
        </span>
        <input
          ref={ref}
          type="search"
          className="search-input__field"
          value={value}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            className="search-input__clear"
            onClick={onClear}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
