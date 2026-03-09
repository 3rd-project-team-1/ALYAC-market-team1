import { useProfile } from '@/entities/user';
import {
  PostEditorLayout,
  useCreatePostInitialContent,
  useCreatePostAction,
  usePostContentFocus,
  usePostFormState,
  usePostImageManager,
} from '@/features/post';

export function PostCreatePage() {
  const { initialContent } = useCreatePostInitialContent();
  const { profile } = useProfile();

  const { form, hasContent } = usePostEditorForm(defaultContent);
  const { isFocused, showError, onFocus, onBlur, handleContentChange } =
    usePostEditorFocus(hasContent);
  const { images, newImageFiles, cleanupPreviewUrls, handleImageAdd, handleImageRemove } =
    usePostImageManager();
  const { submit, isSubmitting } = useCreatePostAction(newImageFiles, cleanupPreviewUrls);

  const contentTextareaProps = form.register('content', {
    required: true,
    onChange: handleContentChange,
  });

  const onSubmit = form.handleSubmit((data) => {
    submit(data.content);
  });

  return (
    <PostEditorLayout
      submitLabel={isSubmitting ? '업로드 중...' : '업로드'}
      isSubmitting={isSubmitting}
      hasContent={hasContent}
      textareaProps={contentTextareaProps}
      isFocused={isFocused}
      showError={showError}
      onContentFocus={onFocus}
      onContentBlur={onBlur}
      images={images}
      profileImage={profile?.image}
      onSubmit={onSubmit}
      onImageAdd={handleImageAdd}
      onImageRemove={handleImageRemove}
    />
  );
}
