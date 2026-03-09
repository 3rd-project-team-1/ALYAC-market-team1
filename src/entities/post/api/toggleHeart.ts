import { API_ENDPOINT, api } from '@/shared/api';

import { type PostResponse, postResponseSchema } from '../model/post.schema';

/**
 * 게시글 좋아요 토글 API
 * @param postId - 게시글 ID
 * @returns 업데이트된 게시글 정보 (좋아요 상태 포함)
 * @example
 * ```ts
 * const { post } = await toggleHeart('post123');
 * console.log(post.hearted); // true 또는 false
 * ```
 */
export const toggleHeart = (postId: string): Promise<PostResponse> =>
  api.post(API_ENDPOINT.POST_HEART(postId), {}, postResponseSchema);
