import { z } from 'zod';

export const postAuthorSchema = z.object({
  _id: z.string(),
  username: z.string(),
  accountname: z.string(),
  image: z.string(),
  intro: z.string(),
  isfollow: z.boolean(),
  following: z.array(z.string()),
  follower: z.array(z.string()),
  followingCount: z.number(),
  followerCount: z.number(),
});

export const postSchema = z.object({
  id: z.string(),
  content: z.string(),
  image: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  hearted: z.boolean(),
  heartCount: z.number(),
  commentCount: z.number(),
  authorId: z.string().optional(),
  author: postAuthorSchema,
});

export const commentSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.string(),
  postId: z.string().optional(),
  authorId: z.string().optional(),
  author: postAuthorSchema,
});

export const postResponseSchema = z.object({
  post: postSchema,
});

export const postsResponseSchema = z.object({
  post: z.array(postSchema),
});

export const feedPostsResponseSchema = z.object({
  posts: z.array(postSchema),
});

export const commentResponseSchema = z.object({
  comment: commentSchema,
});

export const commentsResponseSchema = z.object({
  comment: z.array(commentSchema),
});

export type PostAuthorSchema = z.infer<typeof postAuthorSchema>;
export type PostSchema = z.infer<typeof postSchema>;
export type CommentSchema = z.infer<typeof commentSchema>;
export type PostResponseSchema = z.infer<typeof postResponseSchema>;
export type PostsResponseSchema = z.infer<typeof postsResponseSchema>;
export type FeedPostsResponseSchema = z.infer<typeof feedPostsResponseSchema>;
export type CommentResponseSchema = z.infer<typeof commentResponseSchema>;
export type CommentsResponseSchema = z.infer<typeof commentsResponseSchema>;
