import {
  type ReactNode,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { cn } from "@/lib/utils";

interface ContextMenuItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: ReactNode;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  children: ReactNode;
  className?: string;
}

interface Position {
  x: number;
  y: number;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  children,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      const handleClick = () => close();
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [open, close]);

  return (
    <div
      ref={ref}
      className={cn("contents", className)}
      onContextMenu={handleContextMenu}
    >
      {children}
      {open && (
        <div
          className="z-50 min-w-44 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 duration-150"
          style={{ position: "fixed", left: position.x, top: position.y }}
          role="menu"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              disabled={item.disabled}
              onClick={() => {
                item.onClick();
                close();
              }}
            >
              {item.icon && (
                <span className="size-4 shrink-0">{item.icon}</span>
              )}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
