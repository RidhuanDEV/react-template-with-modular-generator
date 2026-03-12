import type { ReactNode } from "react";
import { clsx } from "clsx";

type SheetSide = "left" | "right" | "top" | "bottom";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  side?: SheetSide;
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Sheet: React.FC<SheetProps> = ({
  open,
  onClose,
  side = "right",
  title,
  children,
  className,
}) => {
  if (!open) return null;

  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} role="presentation" />
      <div
        className={clsx("sheet", `sheet--${side}`, className)}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="sheet__header">
          {title && <h2 className="sheet__title">{title}</h2>}
          <button
            type="button"
            className="sheet__close"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="sheet__content">{children}</div>
      </div>
    </>
  );
};
