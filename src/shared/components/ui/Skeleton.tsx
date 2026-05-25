import { cn } from "@/lib/utils";

interface SkeletonProps {
  width?: string;
  height?: string;
  variant?: "text" | "circular" | "rectangular";
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = "text",
  className,
}) => {
  const variantClass = {
    text: "h-4 w-full rounded-md",
    circular: "rounded-full",
    rectangular: "rounded-md",
  } satisfies Record<NonNullable<SkeletonProps["variant"]>, string>;

  return (
    <div
      className={cn("animate-pulse bg-muted", variantClass[variant], className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};
