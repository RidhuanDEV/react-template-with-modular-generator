import { AlertCircle, Info, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface AlertDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "warning" | "info";
  className?: string;
}

const iconByVariant = {
  danger: AlertCircle,
  warning: TriangleAlert,
  info: Info,
} satisfies Record<NonNullable<AlertDialogProps["variant"]>, typeof Info>;

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  variant = "danger",
  className,
}) => {
  if (!open) return null;

  const Icon = iconByVariant[variant];

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in-0 duration-200"
      role="presentation"
    >
      <div
        className={cn(
          "w-full max-w-md rounded-lg border bg-background p-6 text-foreground shadow-xl animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-200",
          className,
        )}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="flex gap-3">
          <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <div className="grid gap-2">
            <h2 id="alert-dialog-title" className="text-lg font-semibold">
              {title}
            </h2>
            {description && (
              <p
                id="alert-dialog-description"
                className="text-sm text-muted-foreground"
              >
                {description}
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={variant === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
