import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { commentsResponseSchema } from '../model/post.schema';

export const getComments = async (postId: string) => {
  const response = await axiosInstance.get(API_ENDPOINT.POST_COMMENTS(postId));

  const result = commentsResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('getComments 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
