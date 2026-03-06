import { z } from 'zod';

export const authResponseSchema = z.object({
  user: z.object({
    _id: z.string(),
    username: z.string(),
    email: z.string(),
    accountname: z.string(),
    image: z.string(),
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
});
export const refreshResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const validationResponseSchema = z.object({
  ok: z.boolean(),
  message: z.string(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;
export type RefreshResponse = z.infer<typeof refreshResponseSchema>;
export type ValidationResponse = z.infer<typeof validationResponseSchema>;
