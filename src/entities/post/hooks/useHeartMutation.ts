import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { toggleHeart } from '../api/toggleHeart';
import type { Post } from '../model/post.schema';

export function useHeartMutation(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isHearted: boolean) => toggleHeart(postId, isHearted),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['post', postId] });

      const previousPost = queryClient.getQueryData<Post>(['post', postId]);

      queryClient.setQueryData<Post>(['post', postId], (old) => {
        if (!old) return old;

        return {
          ...old,
          hearted: !old.hearted,
          heartCount: old.hearted ? Math.max(0, old.heartCount - 1) : old.heartCount + 1,
        };
      });

      return { previousPost };
    },

    onError: (error: unknown, _variables, context) => {
      const isAlreadyLiked =
        error instanceof AxiosError &&
        error.response?.status === 400 &&
        error.response?.data?.message?.includes('이미 좋아요');

      if (!isAlreadyLiked && context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost);
      }
    },

    onSuccess: (res) => {
      queryClient.setQueryData(['post', postId], res.post);
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
}
