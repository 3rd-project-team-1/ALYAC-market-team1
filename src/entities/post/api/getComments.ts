import { API_ENDPOINT, axiosInstance } from '@/shared/api';

export const getComments = async (postId: string) => {
  const response = await axiosInstance.get(API_ENDPOINT.POST_COMMENTS(postId));

  return response;
};
