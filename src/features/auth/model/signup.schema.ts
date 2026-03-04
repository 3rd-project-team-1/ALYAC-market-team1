import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.email('올바른 이메일 형식을 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
