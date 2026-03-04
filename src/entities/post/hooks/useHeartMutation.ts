import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleHeart } from '../api/toggleHeart';

export function useHeartMutation(postId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleHeart(postId!),
    onSuccess: (res) => {
      queryClient.setQueryData(['post', postId], res.data.post);
    },
  });
}
