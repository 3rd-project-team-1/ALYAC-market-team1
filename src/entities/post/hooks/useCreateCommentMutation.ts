import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createComment } from '../api/createComment';

export function useCreateCommentMutation(postId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => createComment(postId!, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
}
