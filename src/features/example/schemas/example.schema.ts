import { z } from "zod/v4";

export const exampleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["active", "inactive"]),
});

export type ExampleFormData = z.infer<typeof exampleSchema>;
