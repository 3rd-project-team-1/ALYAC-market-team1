import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from '../api/createPost';

interface CreatePostPayload {
  content: string;
  image: string;
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content, image }: CreatePostPayload) => createPost(content, image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
}
