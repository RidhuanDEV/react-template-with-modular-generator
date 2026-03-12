import { AlertDialog } from "@/components/ui/AlertDialog";

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onConfirm,
  onCancel,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
}) => {
  return (
    <AlertDialog
      open={open}
      onConfirm={onConfirm}
      onCancel={onCancel}
      title={title}
      description={description}
      confirmLabel={loading ? "Processing..." : confirmLabel}
      cancelLabel={cancelLabel}
      variant={variant}
    />
  );
};
