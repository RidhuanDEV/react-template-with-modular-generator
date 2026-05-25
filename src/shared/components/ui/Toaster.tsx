import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import { useToastStore } from "./Toast";
import { cn } from "@/lib/utils";

const variantClass = {
  default: "border-border bg-background text-foreground",
  success:
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
  error:
    "border-destructive/25 bg-destructive/10 text-destructive dark:text-red-200",
  warning:
    "border-amber-500/25 bg-amber-500/10 text-amber-900 dark:text-amber-100",
  info: "border-sky-500/25 bg-sky-500/10 text-sky-900 dark:text-sky-100",
} satisfies Record<string, string>;

const iconByVariant = {
  default: Info,
  success: CheckCircle2,
  error: AlertCircle,
  warning: TriangleAlert,
  info: Info,
} satisfies Record<string, typeof Info>;

export const Toaster: React.FC = () => {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed right-4 top-4 z-[1080] grid w-[min(calc(100vw-2rem),24rem)] gap-2"
      aria-live="polite"
    >
      {toasts.map((t) => {
        const Icon = iconByVariant[t.variant];

        return (
          <div
            key={t.id}
            className={cn(
              "grid grid-cols-[auto_1fr_auto] gap-3 rounded-lg border p-4 text-sm shadow-lg backdrop-blur animate-in fade-in-0 slide-in-from-right-2 duration-200",
              variantClass[t.variant],
            )}
          >
            <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <div className="grid gap-1">
              {t.title && (
                <strong className="font-semibold leading-none">
                  {t.title}
                </strong>
              )}
              {t.description && (
                <div className="text-current/80">{t.description}</div>
              )}
            </div>
            <button
              type="button"
              className="rounded-md p-1 text-current/70 transition-colors hover:bg-background/40 hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => removeToast(t.id)}
              aria-label="Close"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
