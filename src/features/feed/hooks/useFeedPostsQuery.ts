import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deletePost as deletePostApi } from '@/entities/post/api/deletePost';
import { getFeedPosts } from '@/entities/post/api/getFeedPosts';
import type { Post } from '@/entities/post/model/post.schema';

import { mapPost } from '../model/mapPost';
import type { PostCardModel } from '../model/types';

const LIMIT = 4;

export const FEED_QUERY_KEY = ['feed', 'posts'] as const;

export function useFeedPostsQuery() {
  const queryClient = useQueryClient();

  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage, isError } =
    useInfiniteQuery({
      queryKey: FEED_QUERY_KEY,
      queryFn: async ({ pageParam }) => {
        const response = await getFeedPosts(pageParam, LIMIT);
        const posts: Post[] = response.posts ?? [];
        return posts;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, _allPages, lastPageParam) =>
        lastPage.length === LIMIT ? lastPageParam + LIMIT : undefined,
      staleTime: 0,
    });

  const posts: PostCardModel[] = (data?.pages.flat() ?? [])
    .map(mapPost)
    .filter((post, idx, arr) => arr.findIndex((p) => p.id === post.id) === idx);

  const deletePost = async (postId: string) => {
    try {
      await deletePostApi(postId);
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
    isError,
    posts,
    deletePost,
    loadMore: fetchNextPage,
    hasMore: hasNextPage ?? false,
  };
}
