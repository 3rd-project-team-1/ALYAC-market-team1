import { useCreatePostPage } from '@/features/create-post';
import { PostEditorLayout } from '@/features/post-editor';

export function PostCreatePage() {
  const {
    profileImage,
    isFocused,
    showError,
    onFocus,
    onBlur,
    hasContent,
    images,
    isSubmitting,
    contentTextareaProps,
    onSubmit,
    handleImageAdd,
    handleImageRemove,
  } = useCreatePostPage();

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
      profileImage={profileImage}
      onSubmit={onSubmit}
      onImageAdd={handleImageAdd}
      onImageRemove={handleImageRemove}
    />
  );
}
