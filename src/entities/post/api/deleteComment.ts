import axiosInstance from '@/shared/api/axios';

export const deleteComment = (postId: string, commentId: string) =>
  axiosInstance.delete(`/api/post/${postId}/comments/${commentId}`);
