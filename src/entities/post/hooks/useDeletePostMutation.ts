import { useMutation } from '@tanstack/react-query';

import { deletePost } from '../api/deletePost';

interface UseDeletePostMutationOptions {
  onSuccess?: () => void;
}

export function useDeletePostMutation(
  postId: string | undefined,
  options?: UseDeletePostMutationOptions,
) {
  return useMutation({
    mutationFn: () => deletePost(postId!),
    onSuccess: () => {
      options?.onSuccess?.();
    },
  });
}
