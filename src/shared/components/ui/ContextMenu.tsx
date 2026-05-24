import {
  type ReactNode,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { clsx } from "clsx";

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
      className={clsx("context-menu-trigger", className)}
      onContextMenu={handleContextMenu}
    >
      {children}
      {open && (
        <div
          className="context-menu"
          style={{ position: "fixed", left: position.x, top: position.y }}
          role="menu"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              className="context-menu__item"
              disabled={item.disabled}
              onClick={() => {
                item.onClick();
                close();
              }}
            >
              {item.icon && (
                <span className="context-menu__icon">{item.icon}</span>
              )}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
