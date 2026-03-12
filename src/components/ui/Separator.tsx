import { clsx } from "clsx";

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
      className={clsx("separator", `separator--${orientation}`, className)}
      role="separator"
      aria-orientation={orientation}
    />
  );
};
