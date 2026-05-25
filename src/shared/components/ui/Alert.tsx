import type { ReactNode } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type AlertVariant = "info" | "success" | "warning" | "danger";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

const variantClass = {
  info: "border-sky-500/25 bg-sky-500/10 text-sky-900 dark:text-sky-100",
  success:
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
  warning:
    "border-amber-500/25 bg-amber-500/10 text-amber-900 dark:text-amber-100",
  danger:
    "border-destructive/25 bg-destructive/10 text-destructive dark:text-red-200",
} satisfies Record<AlertVariant, string>;

const iconByVariant = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
} satisfies Record<AlertVariant, typeof Info>;

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  children,
  onClose,
  className,
}) => {
  const Icon = iconByVariant[variant];

  return (
    <div
      className={cn(
        "relative grid grid-cols-[auto_1fr_auto] gap-3 rounded-lg border p-4 text-sm shadow-xs animate-in fade-in-0 slide-in-from-top-1 duration-200",
        variantClass[variant],
        className,
      )}
      role="alert"
    >
      <Icon className="mt-0.5 size-4" aria-hidden="true" />
      <div className="grid gap-1">
        {title && (
          <strong className="font-semibold leading-none">{title}</strong>
        )}
        <div className="text-current/85">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          className="rounded-md p-1 text-current/70 transition-colors hover:bg-background/40 hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={onClose}
          aria-label="Close alert"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};
