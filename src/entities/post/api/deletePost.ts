import { API_ENDPOINT, api } from '@/shared/api';

import { type DeletePostResponse, deletePostResponseSchema } from '../model/post.schema';

/**
 * 게시글 삭제 API
 * @param postId - 삭제할 게시글 ID
 * @returns { message: "게시글이 삭제되었습니다." }
 * @example
 * ```ts
 * await deletePost('post123');
 * ```
 */
export const deletePost = (postId: string): Promise<DeletePostResponse> =>
  api.delete(API_ENDPOINT.POST_DELETE(postId), deletePostResponseSchema);
