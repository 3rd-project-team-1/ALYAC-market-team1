import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadMultipleImages } from '@/shared/api';

import { postQueryKeys } from '../api/queryKeys';
import { updatePost } from '../api/updatePost';

interface UpdatePostPayload {
  postId: string;
  content: string;
  existingImagePaths?: string[];
  newImageFiles?: File[];
}

export function useUpdatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      content,
      existingImagePaths = [],
      newImageFiles = [],
    }: UpdatePostPayload) => {
      const newImagePaths =
        newImageFiles.length > 0 ? await uploadMultipleImages(newImageFiles) : [];
      const image = [...existingImagePaths, ...newImagePaths].join(',');
      return updatePost(postId, content, image);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.post(variables.postId) });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
}
