import {
  type ReactNode,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";
import { clsx } from "clsx";

interface CommandItem {
  id: string;
  label: string;
  onSelect: () => void;
  icon?: ReactNode;
  shortcut?: string;
}

interface CommandGroup {
  heading?: string;
  items: CommandItem[];
}

interface CommandProps {
  open: boolean;
  onClose: () => void;
  groups: CommandGroup[];
  placeholder?: string;
  className?: string;
}

export const Command: React.FC<CommandProps> = ({
  open,
  onClose,
  groups,
  placeholder = "Type a command or search...",
  className,
}) => {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const prevOpenRef = useRef(false);
  useEffect(() => {
    if (open && !prevOpenRef.current) {
      inputRef.current?.focus();
    }
    prevOpenRef.current = open;
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  if (!open) return null;

  const filteredGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <div className="command-backdrop" onClick={onClose} role="presentation" />
      <div
        className={clsx("command", className)}
        role="dialog"
        onKeyDown={handleKeyDown}
      >
        <div className="command__input-wrapper">
          <input
            ref={inputRef}
            className="command__input"
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="command__list">
          {filteredGroups.map((group, i) => (
            <div key={i} className="command__group">
              {group.heading && (
                <div className="command__group-heading">{group.heading}</div>
              )}
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="command__item"
                  onClick={() => {
                    item.onSelect();
                    onClose();
                  }}
                >
                  {item.icon && (
                    <span className="command__item-icon">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <kbd className="command__shortcut">{item.shortcut}</kbd>
                  )}
                </button>
              ))}
            </div>
          ))}
          {filteredGroups.length === 0 && (
            <div className="command__empty">No results found.</div>
          )}
        </div>
      </div>
    </>
  );
};
