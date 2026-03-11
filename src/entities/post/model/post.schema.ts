import { z } from 'zod';

export const postAuthorSchema = z.object({
  _id: z.string(),
  username: z.string(),
  accountname: z.string(),
  image: z.string(),
  intro: z.string(),
  isfollow: z.boolean().optional(),
  following: z.array(z.string()).optional().default([]),
  follower: z.array(z.string()).optional().default([]),
  followingCount: z.number(),
  followerCount: z.number(),
  email: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
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
  id: z.string().optional(),
  comment: z.array(commentSchema),
});
export const deleteCommentResponseSchema = z.object({
  message: z.string(),
});

export const deletePostResponseSchema = z.object({
  message: z.string(),
});
export type PostAuthor = z.infer<typeof postAuthorSchema>;
export type Post = z.infer<typeof postSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type PostResponse = z.infer<typeof postResponseSchema>;
export type PostsResponse = z.infer<typeof postsResponseSchema>;
export type FeedPostsResponse = z.infer<typeof feedPostsResponseSchema>;
export type CommentResponse = z.infer<typeof commentResponseSchema>;
export type CommentsResponse = z.infer<typeof commentsResponseSchema>;
export type DeleteCommentResponse = z.infer<typeof deleteCommentResponseSchema>;
export type DeletePostResponse = z.infer<typeof deletePostResponseSchema>;
