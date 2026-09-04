import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ShieldCheck, QrCode, Key, Lock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Dialog } from "@/components/ui/Dialog";
import { InputOTP } from "@/components/ui/InputOTP";
import { toast } from "@/components/ui/Toast";

export const TwoFactorAuthSection: React.FC = () => {
  const { t } = useTranslation(["settings", "common"]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (): void => {
    if (!isEnabled) {
      setModalOpen(true);
    } else {
      setIsEnabled(false);
      toast.info({
        title: "2FA Disabled",
        description:
          "Two-Factor Authentication has been disabled for your account.",
      });
    }
  };

  const handleConfirmEnable = (): void => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsEnabled(true);
      setModalOpen(false);
      setCode("");
      toast.success({
        title: "2FA Enabled",
        description: "Two-Factor Authentication is now active on your account.",
      });
    }, 600);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-foreground">
                  {t("settings:twoFactorAuth")}
                </h2>
                {isEnabled ? (
                  <Badge variant="success">{t("common:active")}</Badge>
                ) : (
                  <Badge variant="default">Disabled</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {t("settings:twoFactorAuthDesc")}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="max-w-xl text-sm text-muted-foreground">
            {t("settings:twoFactorAuthBody")}
          </p>

          <div className="pt-2">
            <Button
              type="button"
              variant={isEnabled ? "outline" : "primary"}
              onClick={handleToggle}
              className="flex items-center gap-2"
            >
              {isEnabled ? (
                <>
                  <Lock className="size-4" aria-hidden="true" />
                  <span>{t("settings:disable2FA")}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="size-4" aria-hidden="true" />
                  <span>{t("settings:enable2FA")}</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t("settings:enable2FAModalTitle")}
      >
        <div className="grid gap-4">
          <p className="text-sm text-muted-foreground">
            {t("settings:enable2FAModalDesc")}
          </p>

          <div className="flex flex-col items-center justify-center gap-3 rounded-lg border bg-muted/20 p-6">
            <div className="flex size-36 items-center justify-center rounded-lg border-2 border-dashed border-primary/40 bg-background shadow-xs">
              <QrCode className="size-24 text-primary/80" />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Key className="size-3.5" />
              <span>SETUP KEY: HXDM-4892-KLR9-PT01</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 py-2">
            <label className="text-xs font-medium text-muted-foreground">
              {t("settings:verificationCode")}
            </label>
            <InputOTP
              value={code}
              onChange={setCode}
              length={6}
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
              disabled={isLoading}
            >
              {t("common:cancel")}
            </Button>
            <Button
              type="button"
              variant="primary"
              loading={isLoading}
              disabled={code.length < 6 || isLoading}
              onClick={handleConfirmEnable}
            >
              {t("settings:confirmAndEnable")}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
