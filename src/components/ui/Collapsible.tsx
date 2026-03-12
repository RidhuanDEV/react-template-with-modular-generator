import { type ReactNode, useState, useCallback } from "react";
import { clsx } from "clsx";

interface CollapsibleProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
  defaultOpen = false,
  className,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <div
      className={clsx("collapsible", open && "collapsible--open", className)}
    >
      <button
        type="button"
        className="collapsible__trigger"
        onClick={toggle}
        aria-expanded={open}
      >
        {title}
      </button>
      {open && <div className="collapsible__content">{children}</div>}
    </div>
  );
};
