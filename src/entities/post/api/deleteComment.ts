// deleteComment.ts
import { API_ENDPOINT, api } from '@/shared/api';

import { type DeleteCommentResponse, deleteCommentResponseSchema } from '../model/post.schema';

/**
 * 댓글 삭제 API
 * @param postId - 게시글 ID
 * @param commentId - 삭제할 댓글 ID
 * @returns { message: "댓글이 삭제되었습니다." }
 */
export const deleteComment = (postId: string, commentId: string): Promise<DeleteCommentResponse> =>
  api.delete(API_ENDPOINT.POST_COMMENT_DELETE(postId, commentId), deleteCommentResponseSchema);
