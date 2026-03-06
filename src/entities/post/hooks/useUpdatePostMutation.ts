import { useMutation } from '@tanstack/react-query';

import { updatePost } from '../api/updatePost';

interface UpdatePostPayload {
  postId: string;
  content: string;
  image?: string;
}

export function useUpdatePostMutation() {
  return useMutation({
    mutationFn: ({ postId, content, image = '' }: UpdatePostPayload) =>
      updatePost(postId, content, image),
  });
}
