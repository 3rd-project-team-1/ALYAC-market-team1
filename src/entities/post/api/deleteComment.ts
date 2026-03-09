import { API_ENDPOINT, api } from '@/shared/api';

import { type CommentResponse, commentResponseSchema } from '../model/post.schema';

/**
 * 댓글 삭제 API
 * @param postId - 게시글 ID
 * @param commentId - 삭제할 댓글 ID
 * @returns 삭제된 댓글 정보
 * @example
 * ```ts
 * await deleteComment('post123', 'comment456');
 * ```
 */
export const deleteComment = (postId: string, commentId: string): Promise<CommentResponse> =>
  api.delete(API_ENDPOINT.POST_COMMENT_DELETE(postId, commentId), commentResponseSchema);
