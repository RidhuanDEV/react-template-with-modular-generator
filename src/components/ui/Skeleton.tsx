import { clsx } from "clsx";

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
  return (
    <div
      className={clsx("skeleton", `skeleton--${variant}`, className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};
