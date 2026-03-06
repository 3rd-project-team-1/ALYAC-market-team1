import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useCreatePostMutation } from '@/entities/post';
import { useProfile } from '@/entities/user/hooks/useProfile';
import { uploadMultipleImages } from '@/shared/api';

import { usePostEditorFocus } from '@/features/post-editor/hooks/usePostEditorFocus';
import { usePostEditorForm } from '@/features/post-editor/hooks/usePostEditorForm';
import { usePostEditorImages } from '@/features/post-editor/hooks/usePostEditorImages';

interface LocationState {
  content?: string;
}

export function useCreatePostPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const { profile } = useProfile();
  const { form, hasContent } = usePostEditorForm(state?.content ?? '');
  const { isFocused, showError, onFocus, onBlur, handleContentChange } = usePostEditorFocus(hasContent);
  const { images, newImageFiles, handleImageAdd, handleImageRemove, cleanupPreviewUrls } =
    usePostEditorImages();

  const createPostMutation = useCreatePostMutation();

  const contentTextareaProps = form.register('content', {
    required: true,
    onChange: handleContentChange,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const imagePaths = await uploadMultipleImages(newImageFiles);
    const imageString = imagePaths.join(',');

    createPostMutation.mutate(
      { content: data.content, image: imageString },
      {
        onSuccess: (res) => {
          cleanupPreviewUrls();
          toast.success('게시글이 업로드되었습니다');
          navigate(`/post/${res.data.post.id}`);
        },
        onError: (error) => {
          console.error('게시글 업로드 실패:', error);
          toast.error('게시글 업로드에 실패했습니다');
        },
      },
    );
  });

  return {
    profileImage: profile?.image,
    isFocused,
    showError,
    onFocus,
    onBlur,
    hasContent,
    images,
    isSubmitting: createPostMutation.isPending,
    contentTextareaProps,
    onSubmit,
    handleImageAdd,
    handleImageRemove,
  };
}
