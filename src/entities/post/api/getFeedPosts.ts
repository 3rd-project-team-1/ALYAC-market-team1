import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { feedPostsResponseSchema } from '../model/post.schema';

export const getFeedPosts = async (skip = 0, limit = 10) => {
  const response = await axiosInstance.get(API_ENDPOINT.POST_FEED(skip, limit));

  const result = feedPostsResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('getFeedPosts 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
