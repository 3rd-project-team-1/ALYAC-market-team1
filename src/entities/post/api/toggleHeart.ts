import { API_ENDPOINT, api } from '@/shared/api';

import { type PostResponse, postResponseSchema } from '../model/post.schema';

/**
 * 게시글 좋아요 토글 API
 * @param postId - 게시글 ID
 * @param isHearted - 현재 좋아요 여부
 * @returns 업데이트된 게시글 정보 (좋아요 상태 포함)
 * @example
 * ```ts
 * await toggleHeart('post123', false); // 좋아요 요청
 * await toggleHeart('post123', true); // 좋아요 취소 요청
 * ```
 */
export const toggleHeart = (postId: string, isHearted: boolean): Promise<PostResponse> => {
  if (isHearted) {
    return api.delete(API_ENDPOINT.POST_UNHEART(postId), postResponseSchema);
  }
  return api.post(API_ENDPOINT.POST_HEART(postId), {}, postResponseSchema);
};
