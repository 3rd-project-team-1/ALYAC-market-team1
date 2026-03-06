import { z } from 'zod';

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
  followingCount: z.number(),
  followerCount: z.number(),
  isfollow: z.boolean(),
});

export type UserSchema = z.infer<typeof userSchema>;
export type ProfileSchema = z.infer<typeof profileSchema>;
