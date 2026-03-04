import { useMutation } from '@tanstack/react-query';

import { deletePost } from '../api/deletePost';

export function useDeletePostMutation(postId: string | undefined, onSuccess?: () => void) {
  return useMutation({
    mutationFn: () => deletePost(postId!),
    onSuccess: () => {
      onSuccess?.();
    },
  });
}
