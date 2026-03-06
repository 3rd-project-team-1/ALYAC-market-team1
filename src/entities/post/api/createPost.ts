import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { postResponseSchema } from '../model/post.schema';

export const createPost = async (content: string, image: string = '') => {
  const response = await axiosInstance.post(API_ENDPOINT.POST_CREATE, { post: { content, image } });

  const result = postResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('게시글 생성 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
