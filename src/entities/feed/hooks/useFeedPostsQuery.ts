import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';

import { postApi } from '@/entities/post';
import type { Post } from '@/entities/post';

import type { PostCardModel } from '../types';

const LIMIT = 10;

export const FEED_QUERY_KEY = ['feed'] as const;

function mapPost(post: Post): PostCardModel {
  return {
    id: post.id,
    content: post.content,
    image: post.image && post.image.trim() !== '' ? post.image : undefined,
    hearted: post.hearted ?? false,
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

export function useFeedPostsQuery() {
  const queryClient = useQueryClient();

  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: FEED_QUERY_KEY,
    queryFn: async ({ pageParam }) => {
      const response = await postApi.getFeedPosts(pageParam, LIMIT);
      const posts: Post[] = response.data.posts ?? [];
      return posts;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length === LIMIT ? lastPageParam + LIMIT : undefined,
  });

  // 모든 페이지를 하나로 합친 뒤 최신순 정렬 + 중복 제거
  const posts: PostCardModel[] = (data?.pages.flat() ?? [])
    .map(mapPost)
    .filter((post, idx, arr) => arr.findIndex((p) => p.id === post.id) === idx)
    .sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  // 게시글 삭제 시 캐시에서 해당 항목 제거
  const deletePost = (postId: string) => {
    queryClient.setQueryData(FEED_QUERY_KEY, (old: InfiniteData<Post[]> | undefined) => {
      if (!old) return old;
      return {
        ...old,
        pages: old.pages.map((page) => page.filter((p) => p.id !== postId)),
      };
    });
  };

  return {
    isLoading: isPending,
    isFetchingMore: isFetchingNextPage,
    posts,
    deletePost,
    loadMore: fetchNextPage,
    hasMore: hasNextPage,
  };
}
