import {
  type ReactNode,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";

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
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        type="button"
        className="inline-flex items-center"
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {trigger}
      </button>
      {open && (
        <div className="absolute left-0 z-50 mt-2 w-72 rounded-md border bg-popover p-4 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};
