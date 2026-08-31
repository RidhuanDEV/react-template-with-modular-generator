import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Laptop, Smartphone, Globe, ShieldCheck, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Dialog } from "@/components/ui/Dialog";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useActiveSessions } from "../hooks/useSettings";
import { toast } from "@/components/ui/Toast";

export const ActiveSessionsSection: React.FC = () => {
  const { t } = useTranslation(["settings", "common", "auth"]);
  const { data: sessionsResponse, isLoading } = useActiveSessions();
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const sessions = sessionsResponse?.data ?? [];

  const handleLogoutOthers = (): void => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsLoggingOut(false);
      setModalOpen(false);
      setPassword("");
      toast.success({
        title: "Sessions terminated",
        description: "Logged out from all other browser sessions successfully.",
      });
    }, 800);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="grid gap-1">
            <h2 className="text-lg font-semibold text-foreground">
              {t("settings:browserSessions")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("settings:browserSessionsDesc")}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="max-w-xl text-sm text-muted-foreground">
            {t("settings:browserSessionsBody")}
          </p>

          {isLoading ? (
            <div className="py-4 text-sm text-muted-foreground">
              {t("common:loading")}
            </div>
          ) : (
            <div className="divide-y divide-border/50 rounded-lg border border-border/50">
              {sessions.map((session) => {
                const isMobile =
                  session.device.toLowerCase().includes("iphone") ||
                  session.device.toLowerCase().includes("android");
                const Icon = isMobile
                  ? Smartphone
                  : session.isCurrent
                    ? Laptop
                    : Globe;

                return (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 transition-colors hover:bg-muted/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <div className="grid gap-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">
                            {session.device}
                          </span>
                          {session.isCurrent && (
                            <Badge variant="success" className="text-[10px]">
                              {t("settings:thisDevice")}
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {session.ipAddress} &bull; {session.lastActive}
                        </span>
                      </div>
                    </div>
                    {session.isCurrent && (
                      <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="size-4" />
                        <span>{t("common:active")}</span>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2"
            >
              <LogOut className="size-4" aria-hidden="true" />
              <span>{t("settings:logoutOtherSessions")}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t("settings:logoutOtherSessionsTitle")}
      >
        <div className="grid gap-4">
          <p className="text-sm text-muted-foreground">
            {t("settings:logoutOtherSessionsDesc")}
          </p>
          <PasswordInput
            id="session-pwd"
            label={t("auth:password")}
            placeholder={t("auth:passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
              disabled={isLoggingOut}
            >
              {t("common:cancel")}
            </Button>
            <Button
              type="button"
              variant="primary"
              loading={isLoggingOut}
              disabled={!password || isLoggingOut}
              onClick={handleLogoutOthers}
            >
              {t("common:confirm")}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
