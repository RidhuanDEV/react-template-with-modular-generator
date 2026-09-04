import { z } from "zod/v4";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters"),
    password: z.string().min(8, "New password must be at least 8 characters"),
    passwordConfirmation: z.string().min(8, "Please confirm your new password"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "New passwords do not match",
    path: ["passwordConfirmation"],
  });

export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;

export const deleteAccountSchema = z.object({
  password: z
    .string()
    .min(8, "Please enter your password to confirm account deletion"),
});

export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;
