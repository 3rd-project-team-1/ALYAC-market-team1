import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadMultipleImages } from '@/shared/api';

import { createPost } from '../api/createPost';

interface CreatePostPayload {
  content: string;
  imageFiles?: File[];
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, imageFiles = [] }: CreatePostPayload) => {
      const imagePaths = await uploadMultipleImages(imageFiles);
      const image = imagePaths.join(',');
      return createPost(content, image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
}
