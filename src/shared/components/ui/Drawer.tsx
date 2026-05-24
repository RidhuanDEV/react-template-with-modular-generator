import type { ReactNode } from "react";
import { clsx } from "clsx";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  children,
  className,
}) => {
  if (!open) return null;

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} role="presentation" />
      <div
        className={clsx("drawer", className)}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="drawer__header">
          {title && <h2 className="drawer__title">{title}</h2>}
          <button
            type="button"
            className="drawer__close"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="drawer__content">{children}</div>
      </div>
    </>
  );
};
