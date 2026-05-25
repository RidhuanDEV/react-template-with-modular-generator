import {
  type ReactNode,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200"
        onClick={onClose}
        role="presentation"
      />
      <div
        className={cn(
          "fixed left-1/2 top-[15vh] z-50 grid w-[min(92vw,40rem)] -translate-x-1/2 overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200",
          className,
        )}
        role="dialog"
        aria-modal="true"
        onKeyDown={handleKeyDown}
      >
        <div className="flex h-12 items-center gap-2 border-b px-3">
          <Search className="size-4 text-muted-foreground" aria-hidden="true" />
          <input
            ref={inputRef}
            className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto p-2">
          {filteredGroups.map((group, i) => (
            <div key={i} className="grid gap-1 py-1">
              {group.heading && (
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  {group.heading}
                </div>
              )}
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => {
                    item.onSelect();
                    onClose();
                  }}
                >
                  {item.icon && (
                    <span className="size-4 shrink-0">{item.icon}</span>
                  )}
                  <span className="flex-1">{item.label}</span>
                  {item.shortcut && (
                    <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {item.shortcut}
                    </kbd>
                  )}
                </button>
              ))}
            </div>
          ))}
          {filteredGroups.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          )}
        </div>
      </div>
    </>
  );
};
