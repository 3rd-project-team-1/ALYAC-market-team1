import { API_ENDPOINT, api } from '@/shared/api';

import { type CommentsResponse, commentsResponseSchema } from '../model/post.schema';

/**
 * 댓글 목록 조회 API
 * @param postId - 게시글 ID
 * @returns 댓글 목록
 * @example
 * ```ts
 * const { comment } = await getComments('post123');
 * ```
 */
export const getComments = (postId: string, skip = 0, limit = 10): Promise<CommentsResponse> =>
  api.get(API_ENDPOINT.POST_COMMENTS(postId, skip, limit), commentsResponseSchema);
