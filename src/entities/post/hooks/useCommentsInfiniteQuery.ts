import { useInfiniteQuery } from '@tanstack/react-query';

import { getComments } from '../api/getComments';
import { postQueryKeys } from '../model/queryKeys';

const LIMIT = 10;

export function useCommentsInfiniteQuery(postId: string | undefined) {
  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: postQueryKeys.comments(postId),
    queryFn: async ({ pageParam }) => {
      const response = await getComments(postId!, pageParam, LIMIT);
      return response.comment ?? [];
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length === LIMIT ? lastPageParam + LIMIT : undefined,
    enabled: !!postId,
  });

  const comments = (data?.pages.flat() ?? []).filter(
    (comment, idx, arr) => arr.findIndex((c) => c.id === comment.id) === idx,
  );

  return {
    comments,
    isLoading: isPending,
    isFetchingMore: isFetchingNextPage,
    loadMore: fetchNextPage,
    hasMore: hasNextPage ?? false,
  };
}
