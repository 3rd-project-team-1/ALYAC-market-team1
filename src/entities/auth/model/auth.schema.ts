import { z } from 'zod';

import { userSchema } from '@/entities/user/model/user.schema';

export const authResponseSchema = z.object({
  user: userSchema.omit({ password: true }).extend({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
});

export const refreshResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type AuthResponseSchema = z.infer<typeof authResponseSchema>;
export type RefreshResponseSchema = z.infer<typeof refreshResponseSchema>;
