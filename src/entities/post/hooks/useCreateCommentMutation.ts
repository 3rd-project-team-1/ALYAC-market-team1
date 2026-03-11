import type { InfiniteData } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createComment } from '../api/createComment';
import { postQueryKeys } from '../model/queryKeys';

export function useCreateCommentMutation(postId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => createComment(postId!, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.comments(postId) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.post(postId) });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      // 피드 InfiniteData 캐시에서 해당 포스트의 commentCount를 직접 증가
      // → 뒤로가기 시 refetch 완료를 기다리지 않고 즉시 반영
      queryClient.setQueriesData<InfiniteData<{ id: string; commentCount: number }[]>>(
        { queryKey: ['feed'] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) =>
              page.map((post) =>
                post.id === postId
                  ? { ...post, commentCount: post.commentCount + 1 }
                  : post,
              ),
            ),
          };
        },
      );
    },
  });
}
