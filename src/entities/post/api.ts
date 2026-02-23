import axiosInstance from '@/shared/api/axios';

import type { Comment, Post } from './types';

export interface PostResponse {
  post: Post;
}

export interface PostsResponse {
  post: Post[];
}

export interface CommentsResponse {
  comment: Comment[];
}

export interface CommentResponse {
  comment: Comment;
}

export const postApi = {
  // 게시글 상세 조회 GET /api/post/:post_id
  getPost: (postId: string) => axiosInstance.get<PostResponse>(`/api/post/${postId}`),

  // 좋아요 토글 POST /api/post/:post_id/heart
  toggleHeart: (postId: string) => axiosInstance.post<PostResponse>(`/api/post/${postId}/heart`),

  // 댓글 목록 조회 GET /api/post/:post_id/comments
  getComments: (postId: string) =>
    axiosInstance.get<CommentsResponse>(`/api/post/${postId}/comments`),

  // 댓글 작성 POST /api/post/:post_id/comments
  createComment: (postId: string, content: string) =>
    axiosInstance.post<CommentResponse>(`/api/post/${postId}/comments`, {
      comment: { content },
    }),

  // 댓글 삭제 DELETE /api/post/:post_id/comments/:comment_id
  deleteComment: (postId: string, commentId: string) =>
    axiosInstance.delete(`/api/post/${postId}/comments/${commentId}`),

  // 게시글 삭제 DELETE /api/post/:post_id
  deletePost: (postId: string) => axiosInstance.delete(`/api/post/${postId}`),

  // 유저 게시글 목록 GET /api/post/:accountname/userpost
  getUserPosts: (accountname: string) =>
    axiosInstance.get<PostsResponse>(`/api/post/${accountname}/userpost`),
};
