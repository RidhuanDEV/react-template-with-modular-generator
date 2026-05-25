import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  name?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "",
  size = "md",
  name,
  className,
}) => {
  const initials = name
    ? name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";
  const sizeClass = {
    sm: "size-8 text-xs",
    md: "size-10 text-sm",
    lg: "size-12 text-base",
  } satisfies Record<AvatarSize, string>;

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full border bg-muted text-muted-foreground shadow-xs",
        sizeClass[size],
        className,
      )}
      title={name}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="aspect-square size-full object-cover"
        />
      ) : (
        <span className="flex size-full items-center justify-center font-medium">
          {initials}
        </span>
      )}
    </div>
  );
};
