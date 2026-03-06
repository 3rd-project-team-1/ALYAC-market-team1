import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { postsResponseSchema } from '../model/post.schema';

export const getUserPosts = async (accountname: string) => {
  const response = await axiosInstance.get(API_ENDPOINT.POST_USER(accountname));

  const result = postsResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('getUserPosts 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
