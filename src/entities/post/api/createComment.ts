import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { commentResponseSchema } from '../model/post.schema';

export const createComment = async (postId: string, content: string) => {
  const response = await axiosInstance.post(API_ENDPOINT.POST_COMMENTS(postId), {
    comment: { content },
  });

  const result = commentResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('댓글 작성 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return result.data;
};
