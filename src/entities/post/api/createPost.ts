import { API_ENDPOINT, api } from '@/shared/api';

import { type PostResponse, postResponseSchema } from '../model/post.schema';

/**
 * 게시글 작성 API
 * @param content - 게시글 내용
 * @param image - 이미지 URL (선택)
 * @returns 작성된 게시글 정보
 * @example
 * ```ts
 * const post = await createPost('안녕하세요!');
 * // 이미지 포함
 * const postWithImage = await createPost('안녕하세요!', 'https://example.com/image.jpg');
 * ```
 */
export const createPost = (content: string, image: string = ''): Promise<PostResponse> =>
  api.post(API_ENDPOINT.POST_CREATE, { post: { content, image } }, postResponseSchema);
