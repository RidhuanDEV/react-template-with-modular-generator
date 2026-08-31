import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../schemas/auth.schema";
import { useResetPassword } from "../hooks/useAuth";
import { ROUTES } from "@/config/routes";

export const ResetPasswordForm: React.FC = () => {
  const { t } = useTranslation(["auth", "common"]);
  const [searchParams] = useSearchParams();
  const resetPasswordMutation = useResetPassword();

  const tokenParam = searchParams.get("token") || "mock-token-xyz";
  const emailParam = searchParams.get("email") || "";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: tokenParam,
      email: emailParam,
      password: "",
      passwordConfirmation: "",
    },
  });

  useEffect(() => {
    if (tokenParam) setValue("token", tokenParam);
    if (emailParam) setValue("email", emailParam);
  }, [tokenParam, emailParam, setValue]);

  const onSubmit = (data: ResetPasswordFormData): void => {
    resetPasswordMutation.mutate(data);
  };

  return (
    <Card className="border-border/50 shadow-xl shadow-primary/5">
      <CardHeader>
        <div className="grid gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {t("auth:resetPasswordHeading")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("auth:resetPasswordDesc")}
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
          <Input
            id="email"
            type="email"
            label={t("auth:email")}
            error={errors.email?.message}
            placeholder={t("auth:emailPlaceholder")}
            autoComplete="email"
            {...register("email")}
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

          {resetPasswordMutation.isError && (
            <Alert
              variant="danger"
              title={t("common:errors.somethingWentWrong")}
            >
              {resetPasswordMutation.error?.message ??
                t("common:errors.somethingWentWrong")}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            loading={isSubmitting || resetPasswordMutation.isPending}
            className="mt-2"
          >
            {resetPasswordMutation.isPending
              ? t("auth:resettingPassword")
              : t("auth:resetPassword")}
          </Button>

          <div className="mt-2 text-center text-xs text-muted-foreground">
            {t("auth:alreadyHaveAccount")}{" "}
            <Link
              to={ROUTES.LOGIN}
              className="font-semibold text-primary hover:underline"
            >
              {t("auth:signIn")}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
