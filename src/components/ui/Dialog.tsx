import { type ReactNode, useRef, useEffect, useCallback } from "react";
import { clsx } from "clsx";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  children,
  className,
  title,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) onClose();
    },
    [onClose],
  );

  return (
    <dialog
      ref={dialogRef}
      className={clsx("dialog", className)}
      onClick={handleBackdropClick}
      onClose={onClose}
      aria-label={title}
    >
      <div className="dialog__panel">
        {title && (
          <div className="dialog__header">
            <h2 className="dialog__title">{title}</h2>
            <button
              type="button"
              className="dialog__close"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        )}
        <div className="dialog__content">{children}</div>
      </div>
    </dialog>
  );
};
