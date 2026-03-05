import axiosInstance from '@/shared/api/axios';

import { postResponseSchema } from '../model/post.schema';
import type { PostResponse } from '../types';

export const getPost = async (postId: string): Promise<PostResponse> => {
  const response = await axiosInstance.get(`/api/post/${postId}`);

  const result = postResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('게시글 조회 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
