import {
  type ReactNode,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { clsx } from "clsx";

interface DropdownItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: ReactNode;
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownItem[];
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        e.target instanceof Node &&
        !ref.current.contains(e.target)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  return (
    <div ref={ref} className={clsx("dropdown", className)}>
      <div
        className="dropdown__trigger"
        onClick={toggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") toggle();
        }}
      >
        {trigger}
      </div>
      {open && (
        <div className="dropdown__menu" role="menu">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              className="dropdown__item"
              disabled={item.disabled}
              onClick={() => {
                item.onClick();
                close();
              }}
            >
              {item.icon && <span className="dropdown__icon">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
