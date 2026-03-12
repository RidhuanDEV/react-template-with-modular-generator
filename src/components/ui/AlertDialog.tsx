import type { ReactNode } from "react";
import { clsx } from "clsx";

interface AlertDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  children?: ReactNode;
  className?: string;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onConfirm,
  onCancel,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  children,
  className,
}) => {
  if (!open) return null;

  return (
    <div className="dialog-backdrop" role="presentation">
      <div
        className={clsx("alert-dialog", `alert-dialog--${variant}`, className)}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h2 id="alert-dialog-title" className="alert-dialog__title">
          {title}
        </h2>
        {description && (
          <p
            id="alert-dialog-description"
            className="alert-dialog__description"
          >
            {description}
          </p>
        )}
        {children}
        <div className="alert-dialog__actions">
          <button type="button" className="btn btn--outline" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={clsx("btn", `btn--${variant}`)}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
