import { API_ENDPOINT, axiosInstance } from '@/shared/api';

export const toggleHeart = async (postId: string) => {
  const response = await axiosInstance.post(API_ENDPOINT.POST_HEART(postId));

  return response;
};
