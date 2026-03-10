import { z } from 'zod';

// ===== 기본 스키마 =====
export const userSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  accountname: z.string(),
  intro: z.string().default(''),
  image: z.string(),
  password: z.string(),
  following: z.array(z.string()).default([]),
  followers: z.array(z.string()).default([]),
});

export const profileSchema = z.object({
  _id: z.string(),
  username: z.string(),
  accountname: z.string(),
  intro: z.string().default(''),
  image: z.string(),
  isfollow: z.boolean(),
  following: z.array(z.string()),
  follower: z.array(z.string()),
  followingCount: z.number(),
  followerCount: z.number(),
});

// ===== Auth 관련 스키마 추가 =====
export const signupRequestSchema = z.object({
  user: userSchema.pick({
    username: true,
    email: true,
    accountname: true,
    intro: true,
    image: true,
    password: true,
  }),
});

export const authResponseSchema = z.object({
  user: userSchema.omit({ password: true }).extend({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
});

export const loginRequestSchema = z.object({
  user: userSchema.pick({
    email: true,
    password: true,
  }),
});

export const refreshRequestSchema = z.object({
  refreshToken: z.string(),
});

export const refreshResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const emailValidRequestSchema = z.object({
  user: userSchema.pick({ email: true }),
});

export const accountNameValidRequestSchema = z.object({
  user: userSchema.pick({ accountname: true }),
});

export const updateProfileResponseSchema = z.object({
  user: z.object({
    _id: z.string(),
    username: z.string(),
    accountname: z.string(),
    intro: z.string(),
    image: z.string(),
    following: z.array(z.string()),
    follower: z.array(z.string()),
    followerCount: z.number(),
    followingCount: z.number(),
  }),
});

export const searchUserSchema = profileSchema.omit({ isfollow: true }).extend({
  email: z.string(),
});

export const getProfileResponseSchema = z.object({
  profile: profileSchema,
});

export const searchUsersResponseSchema = z.array(searchUserSchema);

export const getFollowersResponseSchema = z.object({
  follower: z.array(profileSchema),
});

export const getFollowingsResponseSchema = z.object({
  following: z.array(profileSchema),
});

export const followResponseSchema = z.object({
  profile: profileSchema,
});

// ===== 타입 추출 (기존 이름 모두 유지) =====
export type User = z.infer<typeof userSchema>;
export type Profile = z.infer<typeof profileSchema>;

// 기존 타입
export type UpdateProfileRequest = {
  user: {
    username: string;
    accountname: string;
    intro: string;
    image: string;
  };
};
export type SearchUser = z.infer<typeof searchUserSchema>;
export type GetProfileResponse = z.infer<typeof getProfileResponseSchema>;
export type SearchUsersResponse = z.infer<typeof searchUsersResponseSchema>;
export type GetFollowersResponse = z.infer<typeof getFollowersResponseSchema>;
export type GetFollowingsResponse = z.infer<typeof getFollowingsResponseSchema>;
export type UpdateProfileResponse = z.infer<typeof updateProfileResponseSchema>;
export type FollowResponse = z.infer<typeof followResponseSchema>;

// ===== 에러 타입 =====
export interface ApiErrorResponse {
  message: string;
  status: number | string;
}
