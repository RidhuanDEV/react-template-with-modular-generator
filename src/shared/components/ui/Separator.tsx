import { cn } from "@/lib/utils";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation = "horizontal",
  className,
}) => {
  return (
    <div
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      role="separator"
      aria-orientation={orientation}
    />
  );
};
