import { type ReactNode, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
  defaultOpen = false,
  className,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <div className={cn("rounded-md border", className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={toggle}
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="border-t px-4 py-3 text-sm text-muted-foreground animate-in fade-in-0 slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};
