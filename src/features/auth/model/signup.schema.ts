import { z } from 'zod';

export const signupEmailSchema = z.object({
  email: z.email('올바른 이메일 형식을 입력해 주세요.'),
  password: z.string().min(6, '최소 6자 이상이어야 합니다.'),
});

export const signupProfileSchema = z.object({
  username: z.string().min(2, '2자 이상 입력해주세요.').max(10, '10자 이하로 입력해주세요.'),

  accountname: z
    .string()
    .min(1, '계정 ID를 입력해주세요.')
    .regex(/^[a-zA-Z0-9._]+$/, '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.'),

  intro: z.string().max(60, '60자 이내로 작성해주세요'),

  image: z.string(),
});

export type SignupEmailInput = z.infer<typeof signupEmailSchema>;
export type SignupProfileInput = z.infer<typeof signupProfileSchema>;
