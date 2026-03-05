import { API_ENDPOINT, axiosInstance } from '@/shared/api';

export const deleteComment = (postId: string, commentId: string) =>
  axiosInstance.delete(API_ENDPOINT.POST_COMMENT_DELETE(postId, commentId));
