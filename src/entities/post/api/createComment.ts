import { API_ENDPOINT, axiosInstance } from '@/shared/api';

export const createComment = async (postId: string, content: string) => {
  const response = await axiosInstance.post(API_ENDPOINT.POST_COMMENTS(postId), {
    comment: { content },
  });

  return response;
};
