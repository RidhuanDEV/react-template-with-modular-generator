import { z } from "zod/v4";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.string().min(1, "Role is required"),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.email("Please enter a valid email").optional(),
  role: z.string().min(1, "Role is required").optional(),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
