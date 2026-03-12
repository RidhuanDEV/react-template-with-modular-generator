import {
  type ReactNode,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { clsx } from "clsx";

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        e.target instanceof Node &&
        !ref.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={clsx("popover", className)}>
      <div
        className="popover__trigger"
        onClick={toggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") toggle();
        }}
      >
        {trigger}
      </div>
      {open && <div className="popover__content">{children}</div>}
    </div>
  );
};
