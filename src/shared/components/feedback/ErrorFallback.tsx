import React from "react";
import { type FallbackProps } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const { t } = useTranslation("common");

  const message =
    error instanceof Error ? error.message : t("errors.somethingWentWrong");

  return (
    <div className="grid min-h-96 place-items-center p-6" role="alert">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 text-center shadow-lg shadow-destructive/5">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertCircle className="size-6" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          {t("errors.somethingWentWrong")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <Button className="mt-6" onClick={resetErrorBoundary} type="button">
          {t("tryAgain")}
        </Button>
      </div>
    </div>
  );
};
