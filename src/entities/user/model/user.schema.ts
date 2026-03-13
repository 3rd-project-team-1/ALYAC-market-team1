import { z } from 'zod';

// ===== 기본 스키마 =====
export const userSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  accountname: z.string(),
  intro: z.string().default(''),
  image: z.string().nullable().catch(null),
  password: z.string(),
  following: z.array(z.string()).default([]),
  follower: z.array(z.string()).default([]),
});

export const profileSchema = z.object({
  _id: z.string(),
  username: z.string(),
  accountname: z.string(),
  intro: z.string().default(''),
  image: z.string().nullable().catch(null),
  isfollow: z.boolean(),
  following: z.array(z.string()).default([]).catch([]),
  follower: z.array(z.string()).default([]).catch([]),
  followingCount: z.number(),
  followerCount: z.number(),
});

// ===== 인증 관련 스키마 =====
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

// ===== 검증 스키마 =====
export const emailValidRequestSchema = z.object({
  user: userSchema.pick({ email: true }),
});

export const accountNameValidRequestSchema = z.object({
  user: userSchema.pick({ accountname: true }),
});

// ===== 프로필 관련 스키마 =====
export const updateProfileRequestSchema = z.object({
  user: z.object({
    username: z.string(),
    accountname: z.string(),
    intro: z.string(),
    image: z.string().nullable(),
  }),
});

export const updateProfileResponseSchema = z.object({
  user: z.object({
    _id: z.string(),
    username: z.string(),
    accountname: z.string(),
    intro: z.string(),
    image: z.string().nullable().catch(null),
    following: z.array(z.string()).optional().default([]),
    follower: z.array(z.string()).optional().default([]),
    followerCount: z.number(),
    followingCount: z.number(),
  }),
});

export const getProfileResponseSchema = z.object({
  profile: profileSchema,
});

// ===== 검색 관련 스키마 =====
export const searchUserSchema = profileSchema.omit({ isfollow: true }).extend({
  email: z.string(),
});

export const searchUsersResponseSchema = z.array(searchUserSchema);

// ===== 팔로우 관련 스키마 =====
export const getFollowersResponseSchema = z.object({
  follower: z.array(profileSchema),
});

export const getFollowingsResponseSchema = z.object({
  following: z.array(profileSchema),
});

export const followResponseSchema = z.object({
  profile: profileSchema,
});

// ===== 타입 추출 =====
export type User = z.infer<typeof userSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type UpdateProfileRequest = z.infer<typeof updateProfileRequestSchema>;
export type UpdateProfileResponse = z.infer<typeof updateProfileResponseSchema>;
export type SearchUser = z.infer<typeof searchUserSchema>;
export type GetProfileResponse = z.infer<typeof getProfileResponseSchema>;
export type SearchUsersResponse = z.infer<typeof searchUsersResponseSchema>;
export type GetFollowersResponse = z.infer<typeof getFollowersResponseSchema>;
export type GetFollowingsResponse = z.infer<typeof getFollowingsResponseSchema>;
export type FollowResponse = z.infer<typeof followResponseSchema>;

// ===== 에러 타입 =====
export interface ApiErrorResponse {
  message: string;
  status: number | string;
}
