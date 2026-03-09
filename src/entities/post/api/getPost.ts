import { API_ENDPOINT, api } from '@/shared/api';

import { type PostResponse, postResponseSchema } from '../model/post.schema';

/**
 * 게시글 상세 조회 API
 * @param postId - 조회할 게시글 ID
 * @returns 게시글 상세 정보
 * @example
 * ```ts
 * const { post } = await getPost('post123');
 * ```
 */
export const getPost = (postId: string): Promise<PostResponse> =>
  api.get(API_ENDPOINT.POST_GET(postId), postResponseSchema);
