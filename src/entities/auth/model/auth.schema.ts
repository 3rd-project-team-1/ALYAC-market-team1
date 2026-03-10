import { z } from 'zod';

// 공통 유저 객체
const baseUserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  accountname: z.string(),
  intro: z
    .string()
    .nullish()
    .transform((v) => v ?? ''),
  image: z
    .string()
    .nullish()
    .transform((v) => v ?? ''),
});

// 회원가입 응답 스키마
export const signupResponseSchema = z.object({
  message: z.string(),
  user: baseUserSchema,
});

// 로그인 응답 스키마
export const signinResponseSchema = z.object({
  user: baseUserSchema.extend({
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

//  타입 export
export type SigninRequest = {
  user: {
    email: string;
    password: string;
  };
};

export type SignupRequest = {
  user: {
    username: string;
    email: string;
    password: string;
    accountname: string;
    intro?: string;
    image?: string;
  };
};
export type SignupResponse = z.infer<typeof signupResponseSchema>;
export type SigninResponse = z.infer<typeof signinResponseSchema>;
export type RefreshResponse = z.infer<typeof refreshResponseSchema>;
export type ValidationResponse = z.infer<typeof validationResponseSchema>;
