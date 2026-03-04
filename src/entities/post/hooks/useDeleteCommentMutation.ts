import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment } from '../api/deleteComment';

export function useDeleteCommentMutation(postId: string | undefined, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(postId!, commentId),
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
}
