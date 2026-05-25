import { type FallbackProps } from "react-error-boundary";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return (
    <div className="grid min-h-96 place-items-center p-6" role="alert">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 text-center shadow-sm">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle className="size-6" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Something went wrong
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <Button className="mt-6" onClick={resetErrorBoundary} type="button">
          Try Again
        </Button>
      </div>
    </div>
  );
};
