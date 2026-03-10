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
    },
  });
}
