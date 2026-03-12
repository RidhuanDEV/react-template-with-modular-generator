import { clsx } from "clsx";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: AvatarSize;
  fallback?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = "md",
  fallback,
  className,
}) => {
  const initials = fallback ?? alt.charAt(0).toUpperCase();

  return (
    <div
      className={clsx("avatar", `avatar--${size}`, className)}
      aria-label={alt}
    >
      {src ? (
        <img src={src} alt={alt} className="avatar__image" />
      ) : (
        <span className="avatar__fallback">{initials}</span>
      )}
    </div>
  );
};
