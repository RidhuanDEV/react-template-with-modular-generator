import { type ReactNode, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

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
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
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
      className={cn(
        "m-auto w-[min(92vw,32rem)] rounded-lg border bg-background p-0 text-foreground shadow-xl backdrop:bg-black/50 backdrop:backdrop-blur-sm open:animate-in open:fade-in-0 open:zoom-in-95 open:duration-200",
        className,
      )}
      onClick={handleBackdropClick}
      onClose={onClose}
      aria-label={title}
    >
      <div className="grid gap-4 p-6">
        {title && (
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold tracking-normal">{title}</h2>
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
        <div className="text-sm text-foreground">{children}</div>
      </div>
    </dialog>
  );
};
