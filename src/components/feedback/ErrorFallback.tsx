import { type FallbackProps } from "react-error-boundary";

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return (
    <div className="error-fallback" role="alert">
      <div className="error-fallback__content">
        <h2 className="error-fallback__title">Something went wrong</h2>
        <p className="error-fallback__message">{message}</p>
        <button
          className="btn btn--primary"
          onClick={resetErrorBoundary}
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
