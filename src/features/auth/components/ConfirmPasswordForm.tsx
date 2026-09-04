import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import {
  confirmPasswordSchema,
  type ConfirmPasswordFormData,
} from "../schemas/auth.schema";
import { useConfirmPassword } from "../hooks/useAuth";

interface ConfirmPasswordFormProps {
  onSuccess?: () => void;
}

export const ConfirmPasswordForm: React.FC<ConfirmPasswordFormProps> = ({
  onSuccess,
}) => {
  const { t } = useTranslation(["auth", "common"]);
  const confirmPasswordMutation = useConfirmPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmPasswordFormData>({
    resolver: zodResolver(confirmPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (data: ConfirmPasswordFormData): void => {
    confirmPasswordMutation.mutate(data, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    });
  };

  return (
    <Card className="border-border/50 shadow-xl shadow-primary/5">
      <CardHeader>
        <div className="grid gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {t("auth:confirmPasswordHeading")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("auth:confirmPasswordDesc")}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(event) => {
            void handleSubmit(onSubmit)(event);
          }}
          className="grid gap-4"
        >
          <PasswordInput
            id="confirm-pwd"
            label={t("auth:password")}
            error={errors.password?.message}
            placeholder={t("auth:passwordPlaceholder")}
            autoComplete="current-password"
            {...register("password")}
          />

          {confirmPasswordMutation.isError && (
            <Alert
              variant="danger"
              title={t("common:errors.somethingWentWrong")}
            >
              {confirmPasswordMutation.error?.message ??
                t("common:errors.somethingWentWrong")}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            loading={isSubmitting || confirmPasswordMutation.isPending}
            className="mt-2"
          >
            {confirmPasswordMutation.isPending
              ? t("auth:confirming")
              : t("auth:confirm")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
