import { z } from 'zod';

export const editProfileSchema = z.object({
  username: z.string().min(2, '2자 이상 입력해주세요.').max(10, '10자 이하로 입력해주세요.'),
  intro: z.string().max(60, '60자 이내로 작성해주세요').optional(),
});

export type EditProfileInput = z.infer<typeof editProfileSchema>;
