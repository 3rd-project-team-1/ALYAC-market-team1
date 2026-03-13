import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';

import { getUserPosts } from '../api/getUserPosts';
import { toggleHeart } from '../api/toggleHeart';
import type { Post } from '../model/post.schema';
import { postQueryKeys } from '../model/queryKeys';

const LIMIT = 10;

export function useUserPostsInfiniteQuery(accountname?: string) {
  const queryClient = useQueryClient();
  const queryKey = postQueryKeys.userPosts(accountname);

  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const response = await getUserPosts(accountname!, pageParam, LIMIT);
      return response.post ?? [];
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length === LIMIT ? lastPageParam + LIMIT : undefined,
    enabled: !!accountname,
  });

  const posts: Post[] = (data?.pages.flat() ?? []).filter(
    (post, idx, arr) => arr.findIndex((p) => p.id === post.id) === idx,
  );

  const heartMutation = useMutation({
    mutationFn: ({ postId, isHearted }: { postId: string; isHearted: boolean }) =>
      toggleHeart(postId, isHearted),
    onMutate: ({ postId }) => {
      queryClient.setQueryData<InfiniteData<Post[]>>(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) =>
            page.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    hearted: !post.hearted,
                    heartCount: post.hearted ? post.heartCount - 1 : post.heartCount + 1,
                  }
                : post,
            ),
          ),
        };
      });
    },
    onError: () => {
      void queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    posts,
    isLoading: isPending,
    isFetchingMore: isFetchingNextPage,
    loadMore: fetchNextPage,
    hasMore: hasNextPage ?? false,
    heartMutation,
  };
}
