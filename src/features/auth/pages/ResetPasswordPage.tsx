import React from "react";
import { useTranslation } from "react-i18next";
import { Lock } from "lucide-react";
import { ResetPasswordForm } from "../components/ResetPasswordForm";

const ResetPasswordPage: React.FC = () => {
  const { t } = useTranslation("auth");

  return (
    <div className="grid w-full max-w-md gap-6 animate-in fade-in-0 slide-in-from-bottom-3 duration-500">
      <div className="grid gap-3 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <Lock className="size-6" aria-hidden="true" />
        </div>
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {t("resetPasswordTitle")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("resetPasswordSubtitle")}
          </p>
        </div>
      </div>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
