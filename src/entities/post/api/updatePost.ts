import { API_ENDPOINT, axiosInstance } from '@/shared/api';

export const updatePost = async (postId: string, content: string, image: string = '') => {
  const response = await axiosInstance.put(API_ENDPOINT.POST_UPDATE(postId), {
    post: { content, image },
  });

  return response;
};
