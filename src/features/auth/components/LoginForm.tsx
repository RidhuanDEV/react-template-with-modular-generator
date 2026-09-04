import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Checkbox } from "@/components/ui/Checkbox";
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";
import { useLogin } from "../hooks/useAuth";
import { ROUTES } from "@/config/routes";

export const LoginForm: React.FC = () => {
  const { t } = useTranslation(["auth", "common"]);
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (data: LoginFormData): void => {
    login.mutate(data);
  };

  return (
    <Card className="border-border/50 shadow-xl shadow-primary/5">
      <CardHeader>
        <div className="grid gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {t("auth:signIn")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("auth:signInSubtitle")}
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

          <div className="grid gap-1">
            <PasswordInput
              id="password"
              label={t("auth:password")}
              error={errors.password?.message}
              placeholder={t("auth:passwordPlaceholder")}
              autoComplete="current-password"
              {...register("password")}
            />
            <div className="flex justify-end pt-1">
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="text-xs font-medium text-primary hover:underline"
              >
                {t("auth:forgotPasswordHeading")}?
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <Checkbox
              id="remember"
              label={t("auth:rememberMe")}
              {...register("remember")}
            />
          </div>

          {login.isError && (
            <Alert variant="danger" title={t("auth:loginFailed")}>
              {login.error?.message ?? t("common:errors.somethingWentWrong")}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            loading={isSubmitting || login.isPending}
            className="mt-2"
          >
            {login.isPending ? t("auth:signingIn") : t("auth:signIn")}
          </Button>

          <div className="mt-2 text-center text-xs text-muted-foreground">
            {t("auth:dontHaveAccount")}{" "}
            <Link
              to={ROUTES.REGISTER}
              className="font-semibold text-primary hover:underline"
            >
              {t("auth:signUp")}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
