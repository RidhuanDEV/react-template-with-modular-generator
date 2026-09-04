import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Alert } from "@/components/ui/Alert";
import {
  deleteAccountSchema,
  type DeleteAccountFormData,
} from "../schemas/settings.schema";
import { useDeleteAccount } from "../hooks/useSettings";

export const DeleteAccountSection: React.FC = () => {
  const { t } = useTranslation(["settings", "common", "auth"]);
  const [open, setOpen] = useState(false);
  const deleteAccountMutation = useDeleteAccount();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DeleteAccountFormData>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleOpen = (): void => {
    reset();
    setOpen(true);
  };

  const handleClose = (): void => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data: DeleteAccountFormData): void => {
    deleteAccountMutation.mutate(data, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <>
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-destructive/15 text-destructive">
              <AlertTriangle className="size-5" aria-hidden="true" />
            </div>
            <div className="grid gap-0.5">
              <h2 className="text-lg font-semibold text-destructive">
                {t("settings:deleteAccount")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("settings:deleteAccountDesc")}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="max-w-xl text-sm text-muted-foreground">
            {t("settings:deleteAccountBody")}
          </p>
          <div className="pt-4">
            <Button type="button" variant="danger" onClick={handleOpen}>
              {t("settings:deleteAccount")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        title={t("settings:deleteAccountModalTitle")}
      >
        <div className="grid gap-4">
          <p className="text-sm text-muted-foreground">
            {t("settings:deleteAccountModalDesc")}
          </p>
          <form
            onSubmit={(event) => {
              void handleSubmit(onSubmit)(event);
            }}
            className="grid gap-4"
          >
            <PasswordInput
              id="delete-password"
              label={t("auth:confirmPassword")}
              error={errors.password?.message}
              placeholder={t("auth:passwordPlaceholder")}
              autoComplete="current-password"
              {...register("password")}
            />

            {deleteAccountMutation.isError && (
              <Alert
                variant="danger"
                title={t("common:errors.somethingWentWrong")}
              >
                {deleteAccountMutation.error?.message ??
                  t("common:errors.somethingWentWrong")}
              </Alert>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting || deleteAccountMutation.isPending}
              >
                {t("common:cancel")}
              </Button>
              <Button
                type="submit"
                variant="danger"
                loading={deleteAccountMutation.isPending}
                disabled={isSubmitting || deleteAccountMutation.isPending}
              >
                {deleteAccountMutation.isPending
                  ? t("common:deleting")
                  : t("settings:yesDeleteAccount")}
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};
