import { API_ENDPOINT, axiosInstance } from '@/shared/api';

export const createPost = async (content: string, image: string = '') => {
  const response = await axiosInstance.post(API_ENDPOINT.POST_CREATE, { post: { content, image } });

  return response;
};
