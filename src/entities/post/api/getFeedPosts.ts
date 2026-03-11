import { API_ENDPOINT, api } from '@/shared/api';

import { type FeedPostsResponse, feedPostsResponseSchema } from '../model/post.schema';

/**
 * 피드 게시글 목록 조회 API (무한 스크롤용)
 * @param skip - 건너뛸 게시글 수 (기본값: 0)
 * @param limit - 가져올 게시글 수 (기본값: 10)
 * @returns 게시글 목록
 * @example
 * ```ts
 * // 첫 페이지
 * const { posts } = await getFeedPosts(0, 10);
 * // 다음 페이지
 * const { posts: nextPosts } = await getFeedPosts(10, 10);
 * ```
 */
export const getFeedPosts = (skip = 0, limit = 10): Promise<FeedPostsResponse> =>
  api.get(API_ENDPOINT.POST_FEED(skip, limit), feedPostsResponseSchema);
