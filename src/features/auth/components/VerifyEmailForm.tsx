import React from "react";
import { useTranslation } from "react-i18next";
import { useResendVerificationEmail, useLogout } from "../hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { MailCheck } from "lucide-react";

export const VerifyEmailForm: React.FC = () => {
  const { t } = useTranslation(["auth", "common"]);
  const resendMutation = useResendVerificationEmail();
  const logoutMutation = useLogout();

  const handleResend = (): void => {
    resendMutation.mutate();
  };

  const handleLogout = (): void => {
    logoutMutation.mutate();
  };

  return (
    <Card className="border-border/50 shadow-xl shadow-primary/5">
      <CardHeader>
        <div className="grid gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {t("auth:verifyEmailHeading")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("auth:verifyEmailDesc")}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {resendMutation.isSuccess && (
          <Alert variant="success" title={t("auth:verifyEmailTitle")}>
            {t("auth:verificationLinkSent")}
          </Alert>
        )}

        {resendMutation.isError && (
          <Alert variant="danger" title={t("common:errors.somethingWentWrong")}>
            {resendMutation.error?.message ??
              t("common:errors.somethingWentWrong")}
          </Alert>
        )}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            onClick={handleResend}
            loading={resendMutation.isPending}
            disabled={resendMutation.isPending}
            className="flex items-center gap-2"
          >
            <MailCheck className="size-4" aria-hidden="true" />
            <span>{t("auth:resendVerificationEmail")}</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            {t("common:logout")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
