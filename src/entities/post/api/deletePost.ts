import { API_ENDPOINT, axiosInstance } from '@/shared/api';

export const deletePost = (postId: string) =>
  axiosInstance.delete(API_ENDPOINT.POST_DELETE(postId));
