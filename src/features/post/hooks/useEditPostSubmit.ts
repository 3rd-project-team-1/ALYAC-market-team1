import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useUpdatePostMutation } from '@/entities/post';
import { uploadMultipleImages } from '@/shared/api';
import { ROUTE_PATHS } from '@/shared/routes/routePaths';

export function useEditPostSubmit(
  postId: string | undefined,
  existingImagePaths: string[],
  newImageFiles: File[],
  cleanupPreviewUrls: () => void,
) {
  const navigate = useNavigate();
  const updatePostMutation = useUpdatePostMutation();

  const submit = async (content: string) => {
    if (!postId) {
      return;
    }

    const newImagePaths = newImageFiles.length > 0 ? await uploadMultipleImages(newImageFiles) : [];
    const image = [...existingImagePaths, ...newImagePaths].join(',');

    updatePostMutation.mutate(
      { postId, content, image },
      {
        onSuccess: (res) => {
          cleanupPreviewUrls();
          toast.success('게시글이 수정되었습니다');
          navigate(ROUTE_PATHS.POST(res.post.id), { replace: true });
        },
        onError: () => {
          toast.error('게시글 수정에 실패했습니다');
        },
      },
    );
  };

  return {
    submit,
    isSubmitting: updatePostMutation.isPending,
  };
}
