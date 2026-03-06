import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { usePostQuery, useUpdatePostMutation } from '@/entities/post';
import type { Post } from '@/entities/post';
import { useProfile } from '@/entities/user/hooks/useProfile';
import { uploadMultipleImages } from '@/shared/api';

import { usePostEditorFocus } from '@/features/post-editor/hooks/usePostEditorFocus';
import { usePostEditorForm } from '@/features/post-editor/hooks/usePostEditorForm';
import { usePostEditorImages } from '@/features/post-editor/hooks/usePostEditorImages';

interface LocationState {
  post?: Post;
}

export function useEditPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const { data: queriedPost, isLoading: isPostLoading } = usePostQuery(postId);
  const post = state?.post ?? queriedPost;

  const initialImages = post?.image
    ? post.image.split(',').map((image) => image.trim()).filter(Boolean)
    : [];

  const { profile } = useProfile();
  const { form, hasContent } = usePostEditorForm(post?.content ?? '');
  const { isFocused, showError, onFocus, onBlur, handleContentChange } = usePostEditorFocus(hasContent);
  const {
    images,
    newImageFiles,
    existingImagePaths,
    cleanupPreviewUrls,
    handleImageAdd,
    handleImageRemove,
  } = usePostEditorImages(initialImages);

  const updatePostMutation = useUpdatePostMutation();

  const contentTextareaProps = form.register('content', {
    required: true,
    onChange: handleContentChange,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    if (!postId) {
      return;
    }

    const newImagePaths =
      newImageFiles.length > 0 ? await uploadMultipleImages(newImageFiles) : [];
    const allImages = [...existingImagePaths, ...newImagePaths].join(',');

    updatePostMutation.mutate(
      { postId, content: data.content, image: allImages },
      {
        onSuccess: (res) => {
          cleanupPreviewUrls();
          toast.success('게시글이 수정되었습니다');
          navigate(`/post/${res.data.post.id}`, { replace: true });
        },
        onError: () => {
          toast.error('게시글 수정에 실패했습니다');
        },
      },
    );
  });

  return {
    post,
    profileImage: profile?.image,
    isPostLoading,
    isFocused,
    showError,
    onFocus,
    onBlur,
    hasContent,
    images,
    isSubmitting: updatePostMutation.isPending,
    contentTextareaProps,
    onSubmit,
    handleImageAdd,
    handleImageRemove,
  };
}
