import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteComment } from '../api/deleteComment';

export function useDeleteCommentMutation(postId: string | undefined, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(postId!, commentId),
    onSuccess: () => {
      onSuccess?.();
      toast.success('삭제가 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
}
