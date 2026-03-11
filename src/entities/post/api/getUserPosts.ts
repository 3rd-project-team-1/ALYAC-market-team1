import { API_ENDPOINT, api } from '@/shared/api';

import { type PostsResponse, postsResponseSchema } from '../model/post.schema';

/**
 * 특정 사용자의 게시글 목록 조회 API
 * @param accountname - 사용자 계정 ID
 * @returns 사용자의 게시글 목록
 * @example
 * ```ts
 * const { post } = await getUserPosts('hong123');
 * ```
 */
export const getUserPosts = (accountname: string, skip = 0, limit = 10): Promise<PostsResponse> =>
  api.get(API_ENDPOINT.POST_USER(accountname, skip, limit), postsResponseSchema);
