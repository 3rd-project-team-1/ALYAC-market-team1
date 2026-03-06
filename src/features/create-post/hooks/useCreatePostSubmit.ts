import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useCreatePostMutation } from '@/entities/post';
import { uploadMultipleImages } from '@/shared/api';

export function useCreatePostSubmit(imageFiles: File[], cleanupPreviewUrls: () => void) {
  const navigate = useNavigate();
  const createPostMutation = useCreatePostMutation();

  const submit = async (content: string) => {
    const imagePaths = await uploadMultipleImages(imageFiles);
    const image = imagePaths.join(',');

    createPostMutation.mutate(
      { content, image },
      {
        onSuccess: (res) => {
          cleanupPreviewUrls();
          toast.success('게시글이 업로드되었습니다');
          navigate(`/post/${res.post.id}`);
        },
        onError: (error) => {
          console.error('게시글 업로드 실패:', error);
          toast.error('게시글 업로드에 실패했습니다');
        },
      },
    );
  };

  return {
    submit,
    isSubmitting: createPostMutation.isPending,
  };
}
