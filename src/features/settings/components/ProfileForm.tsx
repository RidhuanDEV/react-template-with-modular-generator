import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/auth.store";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from "../schemas/settings.schema";
import { useUpdateProfile } from "../hooks/useSettings";

export const ProfileForm: React.FC = () => {
  const { t } = useTranslation(["settings", "common", "auth"]);
  const user = useAuthStore((state) => state.user);
  const updateProfileMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  const onSubmit = (data: UpdateProfileFormData): void => {
    updateProfileMutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <div className="grid gap-1">
          <h2 className="text-lg font-semibold text-foreground">
            {t("settings:profileInfo")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("settings:profileInfoDesc")}
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
          <div className="flex items-center gap-4 py-2">
            <span className="flex size-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground shadow-sm">
              {user?.name.charAt(0).toUpperCase() ?? "U"}
            </span>
            <div className="grid gap-1">
              <span className="text-sm font-semibold text-foreground">
                {user?.name ?? "User"}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.email ?? "email@example.com"}
              </span>
            </div>
          </div>

          <Input
            id="name"
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

          {updateProfileMutation.isError && (
            <Alert
              variant="danger"
              title={t("common:errors.somethingWentWrong")}
            >
              {updateProfileMutation.error?.message ??
                t("common:errors.somethingWentWrong")}
            </Alert>
          )}

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              disabled={
                !isDirty || isSubmitting || updateProfileMutation.isPending
              }
              loading={updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending
                ? t("common:saving")
                : t("common:save")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
