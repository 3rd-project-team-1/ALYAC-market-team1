import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updatePost } from '../api/updatePost';
import { postQueryKeys } from '../model/queryKeys';

interface UpdatePostPayload {
  postId: string;
  content: string;
  image: string;
}

export function useUpdatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content, image }: UpdatePostPayload) =>
      updatePost(postId, content, image),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.post(variables.postId) });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
}
