import { API_ENDPOINT, api } from '@/shared/api';

import { type PostResponse, postResponseSchema } from '../model/post.schema';

/**
 * 게시글 수정 API
 * @param postId - 수정할 게시글 ID
 * @param content - 수정할 게시글 내용
 * @param image - 수정할 이미지 URL (선택)
 * @returns 수정된 게시글 정보
 * @example
 * ```ts
 * const { post } = await updatePost('post123', '수정된 내용입니다.');
 * // 이미지 포함
 * const updatedPost = await updatePost('post123', '수정된 내용', 'https://example.com/new.jpg');
 * ```
 */
export const updatePost = (
  postId: string,
  content: string,
  image: string = '',
): Promise<PostResponse> =>
  api.put(API_ENDPOINT.POST_UPDATE(postId), { post: { content, image } }, postResponseSchema);
