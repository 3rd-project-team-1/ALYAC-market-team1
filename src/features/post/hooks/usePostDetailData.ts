import { useCommentsInfiniteQuery, usePostQuery } from '@/entities/post';

export function usePostDetailData(postId: string | undefined) {
  const { data: post, isLoading: isPostLoading } = usePostQuery(postId);
  const { comments, isFetchingMore, loadMore, hasMore } = useCommentsInfiniteQuery(postId);

  return {
    post,
    comments,
    isPostLoading,
    commentsPagination: { isFetchingMore, loadMore, hasMore },
  };
}
