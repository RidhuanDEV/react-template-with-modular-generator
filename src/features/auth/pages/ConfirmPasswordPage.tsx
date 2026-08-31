import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShieldAlert } from "lucide-react";
import { ConfirmPasswordForm } from "../components/ConfirmPasswordForm";
import { ROUTES } from "@/config/routes";

const ConfirmPasswordPage: React.FC = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  const handleSuccess = (): void => {
    void navigate(ROUTES.SETTINGS_SECURITY);
  };

  return (
    <div className="grid w-full max-w-md gap-6 animate-in fade-in-0 slide-in-from-bottom-3 duration-500">
      <div className="grid gap-3 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <ShieldAlert className="size-6" aria-hidden="true" />
        </div>
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {t("confirmPasswordTitle")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("confirmPasswordSubtitle")}
          </p>
        </div>
      </div>
      <ConfirmPasswordForm onSuccess={handleSuccess} />
    </div>
  );
};

export default ConfirmPasswordPage;
