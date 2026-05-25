import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type SheetSide = "left" | "right" | "top" | "bottom";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  side?: SheetSide;
  title?: string;
  children: ReactNode;
  className?: string;
}

const sideClass = {
  left: "left-0 top-0 h-full w-80 border-r animate-in slide-in-from-left",
  right: "right-0 top-0 h-full w-80 border-l animate-in slide-in-from-right",
  top: "left-0 top-0 w-full border-b animate-in slide-in-from-top",
  bottom: "bottom-0 left-0 w-full border-t animate-in slide-in-from-bottom",
} satisfies Record<SheetSide, string>;

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
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200"
        onClick={onClose}
        role="presentation"
      />
      <div
        className={cn(
          "fixed z-50 bg-background p-6 text-foreground shadow-xl duration-300",
          sideClass[side],
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-center justify-between gap-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-4 text-sm">{children}</div>
      </div>
    </>
  );
};
