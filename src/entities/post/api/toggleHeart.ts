import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { postResponseSchema } from '../model/post.schema';

export const toggleHeart = async (postId: string) => {
  const response = await axiosInstance.post(API_ENDPOINT.POST_HEART(postId));

  const result = postResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('toggleHeart 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
