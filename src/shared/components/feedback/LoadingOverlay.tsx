import { clsx } from "clsx";

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message = "Loading...",
  className,
}) => {
  if (!visible) return null;

  return (
    <div
      className={clsx("loading-overlay", className)}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="loading-overlay__content">
        <div className="loading-overlay__spinner" />
        <p className="loading-overlay__message">{message}</p>
      </div>
    </div>
  );
};
