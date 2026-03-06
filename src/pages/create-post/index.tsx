import { useProfile } from '@/entities/user';
import {
  PostEditorLayout,
  useCreatePostDefaultContent,
  useCreatePostSubmit,
  usePostEditorFocus,
  usePostEditorForm,
  usePostEditorImages,
} from '@/features/post';

export function PostCreatePage() {
  const { defaultContent } = useCreatePostDefaultContent();
  const { profile } = useProfile();

  const { form, hasContent } = usePostEditorForm(defaultContent);
  const { isFocused, showError, onFocus, onBlur, handleContentChange } = usePostEditorFocus(hasContent);
  const { images, newImageFiles, cleanupPreviewUrls, handleImageAdd, handleImageRemove } =
    usePostEditorImages();
  const { submit, isSubmitting } = useCreatePostSubmit(newImageFiles, cleanupPreviewUrls);

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
