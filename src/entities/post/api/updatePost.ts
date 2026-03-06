import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { postResponseSchema } from '../model/post.schema';

export const updatePost = async (postId: string, content: string, image: string = '') => {
  const response = await axiosInstance.put(API_ENDPOINT.POST_UPDATE(postId), {
    post: { content, image },
  });

  const result = postResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('updatePost 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
