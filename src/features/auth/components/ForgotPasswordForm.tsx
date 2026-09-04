import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../schemas/auth.schema";
import { useForgotPassword } from "../hooks/useAuth";
import { ROUTES } from "@/config/routes";
import { ArrowLeft } from "lucide-react";

export const ForgotPasswordForm: React.FC = () => {
  const { t } = useTranslation(["auth", "common"]);
  const forgotPasswordMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormData): void => {
    forgotPasswordMutation.mutate(data);
  };

  return (
    <Card className="border-border/50 shadow-xl shadow-primary/5">
      <CardHeader>
        <div className="grid gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {t("auth:forgotPasswordHeading")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("auth:forgotPasswordDesc")}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {forgotPasswordMutation.isSuccess ? (
          <div className="grid gap-4">
            <Alert variant="info" title={t("auth:verifyEmailTitle")}>
              {forgotPasswordMutation.data?.data.message}
            </Alert>
            <Link to={ROUTES.LOGIN} className="no-underline">
              <Button
                type="button"
                variant="outline"
                fullWidth
                className="flex items-center justify-center gap-2"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                <span>{t("auth:returnToLogin")}</span>
              </Button>
            </Link>
          </div>
        ) : (
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

            {forgotPasswordMutation.isError && (
              <Alert
                variant="danger"
                title={t("common:errors.somethingWentWrong")}
              >
                {forgotPasswordMutation.error?.message ??
                  t("common:errors.somethingWentWrong")}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              loading={isSubmitting || forgotPasswordMutation.isPending}
              className="mt-2"
            >
              {forgotPasswordMutation.isPending
                ? t("auth:sendingLink")
                : t("auth:sendResetLink")}
            </Button>

            <div className="mt-2 text-center text-xs text-muted-foreground">
              {t("auth:alreadyHaveAccount")}{" "}
              <Link
                to={ROUTES.LOGIN}
                className="font-semibold text-primary hover:underline"
              >
                {t("auth:backToSignIn")}
              </Link>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
