import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deletePost as deletePostApi } from '@/entities/post/api/deletePost';
import { getFeedPosts } from '@/entities/post/api/getFeedPosts';
import type { Post } from '@/entities/post/model/post.schema';

import type { PostCardModel } from '../model/types';

/** 한 번에 불러올 게시글 수 */
const LIMIT = 4;

/** TanStack Query 캐시 키 (피드 전체 데이터에 대한 식별자) */
export const FEED_QUERY_KEY = ['feed'] as const;

/**
 * 서버 Post 엔티티를 화면 렌더링용 PostCardModel로 변환합니다.
 * 이미지가 빈 문자열인 경우 undefined로 처리하여 img 태그가 불필요하게 렌더링되는 것을 방지합니다.
 */
function mapPost(post: Post): PostCardModel {
  return {
    id: post.id,
    content: post.content,
    image: post.image && post.image.trim() !== '' ? post.image : undefined,
    hearted: post.hearted,
    heartCount: post.heartCount,
    commentCount: post.commentCount,
    createdAt: post.createdAt,
    author: {
      username: post.author.username,
      accountname: post.author.accountname,
      image: post.author.image,
    },
  };
}

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

  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: FEED_QUERY_KEY,
    queryFn: async ({ pageParam }) => {
      const response = await getFeedPosts(pageParam, LIMIT);
      const posts: Post[] = response.posts ?? [];
      return posts;
    },
    initialPageParam: 0,
    // 마지막 페이지가 LIMIT 개수와 같으면 다음 페이지가 있다고 판단
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length === LIMIT ? lastPageParam + LIMIT : undefined,
  });

  // 모든 페이지를 하나로 합친 뒤 중복 제거 (서버가 최신순으로 반환하므로 재정렬 불필요)
  const posts: PostCardModel[] = (data?.pages.flat() ?? [])
    .map(mapPost)
    .filter((post, idx, arr) => arr.findIndex((p) => p.id === post.id) === idx);

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
    isFetchingMore: isFetchingNextPage,
    posts,
    deletePost,
    loadMore: fetchNextPage,
    hasMore: hasNextPage ?? false,
  };
}
