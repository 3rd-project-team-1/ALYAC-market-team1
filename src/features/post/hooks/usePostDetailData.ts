import { useCommentsQuery, usePostQuery } from '@/entities/post';

export function usePostDetailData(postId: string | undefined) {
  const { data: post, isLoading: isPostLoading } = usePostQuery(postId);
  const { data: comments = [] } = useCommentsQuery(postId);

  return {
    post,
    comments,
    isPostLoading,
  };
}
