import axiosInstance from '@/shared/api/axios';

export const deletePost = (postId: string) =>
  axiosInstance.delete(`/api/post/${postId}`);
