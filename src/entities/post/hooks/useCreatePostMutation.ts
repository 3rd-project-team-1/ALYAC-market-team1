import { useMutation } from '@tanstack/react-query';

import { createPost } from '../api/createPost';

interface CreatePostPayload {
  content: string;
  image?: string;
}

export function useCreatePostMutation() {
  return useMutation({
    mutationFn: ({ content, image = '' }: CreatePostPayload) => createPost(content, image),
  });
}
