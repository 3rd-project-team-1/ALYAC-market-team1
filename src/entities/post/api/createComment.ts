import { API_ENDPOINT, api } from '@/shared/api';

import { type CommentResponse, commentResponseSchema } from '../model/post.schema';

/**
 * 댓글 작성 API
 * @param postId - 게시글 ID
 * @param content - 댓글 내용
 * @returns 작성된 댓글 정보
 * @example
 * ```ts
 * const comment = await createComment('post123', '좋은 글이네요!');
 * ```
 */
export const createComment = (postId: string, content: string): Promise<CommentResponse> =>
  api.post(API_ENDPOINT.POST_COMMENTS(postId), { comment: { content } }, commentResponseSchema);
