import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePost } from '../api/deletePost';

interface UseDeleteUserPostMutationOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

export function useDeleteUserPostMutation(
  accountname?: string | null,
  options?: UseDeleteUserPostMutationOptions,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts', accountname] });
      options?.onSuccess?.();
    },
    onError: () => {
      options?.onError?.();
    },
  });
}
