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
import { registerSchema, type RegisterFormData } from "../schemas/auth.schema";
import { useRegister } from "../hooks/useAuth";
import { ROUTES } from "@/config/routes";

export const RegisterForm: React.FC = () => {
  const { t } = useTranslation(["auth", "common"]);
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      terms: false,
    },
  });

  const onSubmit = (data: RegisterFormData): void => {
    registerMutation.mutate(data);
  };

  return (
    <Card className="border-border/50 shadow-xl shadow-primary/5">
      <CardHeader>
        <div className="grid gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {t("auth:createAccountTitle")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("auth:createAccountSubtitle")}
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
            id="name"
            type="text"
            label={t("auth:fullName")}
            error={errors.name?.message}
            placeholder={t("auth:fullNamePlaceholder")}
            autoComplete="name"
            {...register("name")}
          />

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
            label={t("auth:password")}
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

          <div className="flex flex-col gap-1">
            <Checkbox
              id="terms"
              label={t("auth:termsAgreement")}
              {...register("terms")}
            />
            {errors.terms?.message && (
              <span className="text-xs text-destructive" role="alert">
                {errors.terms.message}
              </span>
            )}
          </div>

          {registerMutation.isError && (
            <Alert variant="danger" title={t("auth:registrationFailed")}>
              {registerMutation.error?.message ??
                t("common:errors.somethingWentWrong")}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            loading={isSubmitting || registerMutation.isPending}
            className="mt-2"
          >
            {registerMutation.isPending
              ? t("auth:creatingAccount")
              : t("auth:createAccount")}
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
