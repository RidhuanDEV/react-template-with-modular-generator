import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message = "Loading...",
  className,
}) => {
  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 grid place-items-center bg-background/70 p-4 backdrop-blur-sm animate-in fade-in-0 duration-200",
        className,
      )}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3 text-sm shadow-lg">
        <Loader2
          className="size-4 animate-spin text-primary"
          aria-hidden="true"
        />
        <p className="font-medium text-foreground">{message}</p>
      </div>
    </div>
  );
};
