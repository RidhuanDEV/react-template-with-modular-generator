import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import {
  updatePasswordSchema,
  type UpdatePasswordFormData,
} from "../schemas/settings.schema";
import { useUpdatePassword } from "../hooks/useSettings";

export const PasswordForm: React.FC = () => {
  const { t } = useTranslation(["settings", "common", "auth"]);
  const updatePasswordMutation = useUpdatePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = (data: UpdatePasswordFormData): void => {
    updatePasswordMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="grid gap-1">
          <h2 className="text-lg font-semibold text-foreground">
            {t("settings:updatePassword")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("settings:updatePasswordDesc")}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(event) => {
            void handleSubmit(onSubmit)(event);
          }}
          className="grid max-w-xl gap-4"
        >
          <PasswordInput
            id="currentPassword"
            label={t("auth:currentPassword")}
            error={errors.currentPassword?.message}
            placeholder={t("auth:passwordPlaceholder")}
            autoComplete="current-password"
            {...register("currentPassword")}
          />

          <PasswordInput
            id="password"
            label={t("auth:newPassword")}
            error={errors.password?.message}
            placeholder={t("auth:passwordPlaceholder")}
            autoComplete="new-password"
            {...register("password")}
          />

          <PasswordInput
            id="passwordConfirmation"
            label={t("auth:confirmPassword")}
            error={errors.passwordConfirmation?.message}
            placeholder={t("auth:passwordPlaceholder")}
            autoComplete="new-password"
            {...register("passwordConfirmation")}
          />

          {updatePasswordMutation.isError && (
            <Alert
              variant="danger"
              title={t("common:errors.somethingWentWrong")}
            >
              {updatePasswordMutation.error?.message ??
                t("common:errors.somethingWentWrong")}
            </Alert>
          )}

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              disabled={isSubmitting || updatePasswordMutation.isPending}
              loading={updatePasswordMutation.isPending}
            >
              {updatePasswordMutation.isPending
                ? t("common:saving")
                : t("settings:updatePassword")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
