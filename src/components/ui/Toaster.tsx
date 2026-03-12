import { clsx } from "clsx";
import { useToastStore } from "./Toast";

export const Toaster: React.FC = () => {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="toaster" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={clsx("toast", `toast--${t.variant}`)}>
          <div className="toast__content">
            {t.title && <strong className="toast__title">{t.title}</strong>}
            {t.description && (
              <div className="toast__description">{t.description}</div>
            )}
          </div>
          <button
            type="button"
            className="toast__close"
            onClick={() => removeToast(t.id)}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};
