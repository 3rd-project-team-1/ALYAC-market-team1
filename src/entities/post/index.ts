import { createComment } from './api/createComment';
import { createPost } from './api/createPost';
import { deleteComment } from './api/deleteComment';
import { deletePost } from './api/deletePost';
import { getComments } from './api/getComments';
import { getFeedPosts } from './api/getFeedPosts';
import { getPost } from './api/getPost';
import { getUserPosts } from './api/getUserPosts';
import { toggleHeart } from './api/toggleHeart';
import { updatePost } from './api/updatePost';

// 하위 호환을 위한 postApi 객체 (기존 코드가 사용 중)
export const postApi = {
  createPost,
  getPost,
  updatePost,
  toggleHeart,
  getComments,
  createComment,
  deleteComment,
  deletePost,
  getUserPosts,
  getFeedPosts,
};

// 개별 API 함수 exports
export { createPost } from './api/createPost';
export { getPost } from './api/getPost';
export { updatePost } from './api/updatePost';
export { deletePost } from './api/deletePost';
export { toggleHeart } from './api/toggleHeart';
export { getComments } from './api/getComments';
export { createComment } from './api/createComment';
export { deleteComment } from './api/deleteComment';
export { getUserPosts } from './api/getUserPosts';
export { getFeedPosts } from './api/getFeedPosts';

export type {
  Post,
  PostAuthor,
  Comment,
  PostResponse,
  PostsResponse,
  CommentsResponse,
  CommentResponse,
} from './types';

export { usePostQuery } from './hooks/usePostQuery';
export { useCommentsQuery } from './hooks/useCommentsQuery';
export { useHeartMutation } from './hooks/useHeartMutation';
export { useCreateCommentMutation } from './hooks/useCreateCommentMutation';
export { useDeleteCommentMutation } from './hooks/useDeleteCommentMutation';
export { useDeletePostMutation } from './hooks/useDeletePostMutation';
export { useUserPostsWithHeart } from './hooks/useUserPostsWithHeart';
