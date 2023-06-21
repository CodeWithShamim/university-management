import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    role: z.enum(['student', 'admin', 'faculty']).optional(),
    password: z
      .string({
        required_error: 'Password is required.',
      })
      .optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
