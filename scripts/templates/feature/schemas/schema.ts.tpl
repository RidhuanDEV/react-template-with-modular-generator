import { z } from 'zod';

export const {{camelCase}}Schema = z.object({
  // Define your schema fields here
});

export type {{pascalCase}}FormData = z.infer<typeof {{camelCase}}Schema>;
