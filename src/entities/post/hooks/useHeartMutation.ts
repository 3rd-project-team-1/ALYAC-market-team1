import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';

import { toggleHeart } from '../api/toggleHeart';
import type { Post } from '../types';

export function useHeartMutation(postId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleHeart(postId!),
    onSuccess: (res) => {
      const updatedPost = res.data.post;
      // 게시글 상세 캐시 업데이트
      queryClient.setQueryData(['post', postId], updatedPost);
      // 피드 캐시에서 해당 게시글의 hearted/heartCount 동기화
      queryClient.setQueryData(['feed'], (old: InfiniteData<Post[]> | undefined) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) =>
            page.map((p) =>
              p.id === postId
                ? { ...p, hearted: updatedPost.hearted, heartCount: updatedPost.heartCount }
                : p,
            ),
          ),
        };
      });
    },
  });
}
