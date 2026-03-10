import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment } from '../api/deleteComment';
import { postQueryKeys } from '../model/queryKeys';

export function useDeleteCommentMutation(postId: string | undefined, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(postId!, commentId),
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: postQueryKeys.comments(postId) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.post(postId) });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
}
