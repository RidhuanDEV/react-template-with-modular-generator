import type { ReactNode } from "react";
import { clsx } from "clsx";

type AlertVariant = "info" | "success" | "warning" | "danger";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  children,
  className,
  onClose,
}) => {
  return (
    <div className={clsx("alert", `alert--${variant}`, className)} role="alert">
      <div className="alert__content">
        {title && <strong className="alert__title">{title}</strong>}
        <div className="alert__message">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          className="alert__close"
          onClick={onClose}
          aria-label="Close alert"
        >
          &times;
        </button>
      )}
    </div>
  );
};
