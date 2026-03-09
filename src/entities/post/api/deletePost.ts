import { API_ENDPOINT, api } from '@/shared/api';

import { type PostResponse, postResponseSchema } from '../model/post.schema';

/**
 * 게시글 삭제 API
 * @param postId - 삭제할 게시글 ID
 * @returns 삭제된 게시글 정보
 * @example
 * ```ts
 * await deletePost('post123');
 * ```
 */
export const deletePost = (postId: string): Promise<PostResponse> =>
  api.delete(API_ENDPOINT.POST_DELETE(postId), postResponseSchema);
