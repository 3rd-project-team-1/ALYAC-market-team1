import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deletePost as deletePostApi } from '@/entities/post/api/deletePost';
import { getFeedPosts } from '@/entities/post/api/getFeedPosts';
import type { Post } from '@/entities/post/model/post.schema';

import { mapPost } from '../model/mapPost';
import type { PostCardModel } from '../model/types';

/** 한 번에 불러올 게시글 수 */
const LIMIT = 4;

/** 메인 피드 요청 최대 대기 시간 (ms) - 초과 시 폴백 로딩으로 전환 */
const FEED_REQUEST_TIMEOUT_MS = 8000;

/** TanStack Query 캐시 키 (피드 전체 데이터에 대한 식별자) */
export const FEED_QUERY_KEY = ['feed'] as const;

/**
 * 피드 게시글 목록을 무한 스크롤로 조회하고 삭제 기능을 제공하는 훅입니다.
 *
 * 내부적으로 TanStack Query의 `useInfiniteQuery`를 사용하여
 * 오프셋 기반 페이지네이션(skip/limit)으로 데이터를 페치합니다.
 *
 * @returns
 * - `isLoading` : 최초 로딩 여부
 * - `isFetchingMore` : 다음 페이지 로딩 여부
 * - `posts` : 중복 제거된 PostCardModel 배열
 * - `deletePost` : 게시글 삭제 후 캐시 즉시 반영
 * - `loadMore` : 다음 페이지 불러오기
 * - `hasMore` : 추가 페이지 존재 여부
 */
export function useFeedPostsQuery() {
  const queryClient = useQueryClient();

  const {
    data,
    isPending,
    isFetched,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    hasNextPage,
    isError,
    isFetchNextPageError,
  } = useInfiniteQuery({
    queryKey: FEED_QUERY_KEY,
    queryFn: async ({ pageParam }) => {
      const response = await Promise.race([
        getFeedPosts(pageParam, LIMIT),
        new Promise<never>((_, reject) => {
          window.setTimeout(() => {
            reject(new Error('Feed request timeout'));
          }, FEED_REQUEST_TIMEOUT_MS);
        }),
      ]);
      const posts: Post[] = response.posts ?? [];
      return posts;
    },
    initialPageParam: 0,
    // 마지막 페이지가 LIMIT 개수와 같으면 다음 페이지가 있다고 판단
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length === LIMIT ? lastPageParam + LIMIT : undefined,
    // 항상 stale로 간주 → 피드 마운트 시 즉시 re-fetch하여 좋아요/댓글 카운트 최신화
    staleTime: 0,
    // 실패 시 즉시 폴백으로 전환해 긴 스피너 대기를 줄임
    retry: 0,
  });

  // 모든 페이지를 하나로 합친 뒤 중복 제거 (서버가 최신순으로 반환하므로 재정렬 불필요)
  // 피드는 항상 팔로우한 사람의 글만 노출되므로 isfollow를 true로 교정합니다.
  const seenPostIds = new Set<string>();
  const posts: PostCardModel[] = [];

  for (const post of data?.pages.flat() ?? []) {
    if (seenPostIds.has(post.id)) continue;
    seenPostIds.add(post.id);
    posts.push({ ...mapPost(post), isfollow: true });
  }

  /**
   * 게시글 삭제 핸들러
   * - API 호출 후 React Query 캐시에서 해당 게시글을 즉시 제거합니다 (낙관적 캐시 갱신).
   * - 실패 시 토스트 메시지로 에러를 알립니다.
   */
  const deletePost = async (postId: string) => {
    try {
      await deletePostApi(postId);
      // 캐시의 각 페이지에서 삭제된 postId를 필터링하여 제거
      queryClient.setQueryData(FEED_QUERY_KEY, (old: InfiniteData<Post[]> | undefined) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => page.filter((p) => p.id !== postId)),
        };
      });
      toast.success('게시글이 삭제되었습니다.');
    } catch {
      toast.error('게시글 삭제에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return {
    isLoading: isPending,
    hasFetchedOnce: isFetched,
    isFetchingMore: isFetchingNextPage,
    // 첫 로딩/재조회 실패뿐 아니라 다음 페이지 실패도 폴백 트리거에 포함
    isError: isError || isFetchNextPageError,
    posts,
    deletePost,
    loadMore: fetchNextPage,
    retryFeed: () => refetch(),
    hasMore: hasNextPage ?? false,
  };
}
