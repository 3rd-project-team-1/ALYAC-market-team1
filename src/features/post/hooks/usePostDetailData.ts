import { useCommentsInfiniteQuery, usePostQuery } from '@/entities/post';

export function usePostDetailData(postId: string | undefined) {
  const { data: post, isLoading: isPostLoading } = usePostQuery(postId);
  const { comments, isLoading: isCommentsLoading, isFetchingMore, loadMore, hasMore } = useCommentsInfiniteQuery(postId);

  return {
    post,
    comments,
    isPostLoading,
    isCommentsLoading,
    commentsPagination: { isFetchingMore, loadMore, hasMore },
  };
}
